import os
import httpx
from typing import List, Dict
from .base import LLMAdapter

class GeminiAdapter(LLMAdapter):
    """
    Adapter for Google Gemini API using direct HTTP calls via httpx.
    Optimized for Gemini Flash free tier models (e.g. gemini-1.5-flash, gemini-2.0-flash).
    """

    def __init__(self, api_key: str = None, model: str = None):
        self._api_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or ""
        self._model = model or os.getenv("GEMINI_MODEL") or "gemini-1.5-flash"

    @property
    def provider_name(self) -> str:
        return "Google Gemini"

    @property
    def model_name(self) -> str:
        return self._model

    async def generate_response(self, system_prompt: str, messages: List[Dict[str, str]]) -> str:
        if not self._api_key:
            return (
                "Gemini API key is not configured on the server. "
                "Please set GEMINI_API_KEY in your backend/.env file."
            )

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self._model}:generateContent"
        headers = {
            "x-goog-api-key": self._api_key,
            "Content-Type": "application/json"
        }

        # Format conversation messages for Gemini API ('user' or 'model')
        raw_contents = []
        for m in messages:
            if m.get("role") in ["user", "assistant", "model"]:
                role = "model" if m["role"] in ["assistant", "model"] else "user"
                raw_contents.append({
                    "role": role,
                    "parts": [{"text": m.get("content", "")}]
                })

        # Gemini requires that contents begins with a 'user' turn
        while raw_contents and raw_contents[0]["role"] != "user":
            raw_contents.pop(0)

        # Fallback if history had no prior user message
        if not raw_contents:
            raw_contents = [{
                "role": "user",
                "parts": [{"text": messages[-1].get("content", "") if messages else "Hello"}]
            }]

        # Combine consecutive messages with the same role into parts
        merged_contents = []
        for item in raw_contents:
            if merged_contents and merged_contents[-1]["role"] == item["role"]:
                merged_contents[-1]["parts"].extend(item["parts"])
            else:
                merged_contents.append(item)

        payload = {
            "system_instruction": {
                "parts": [{"text": system_prompt}]
            },
            "contents": merged_contents,
            "generationConfig": {
                "temperature": 0.2,
                "maxOutputTokens": 1024
            }
        }

        try:
            async with httpx.AsyncClient(timeout=45.0) as client:
                res = await client.post(url, headers=headers, json=payload)
                res.raise_for_status()
                data = res.json()

                candidates = data.get("candidates", [])
                if candidates:
                    first_cand = candidates[0]
                    parts = first_cand.get("content", {}).get("parts", [])
                    text_parts = [p.get("text", "") for p in parts if "text" in p]
                    if text_parts:
                        return "".join(text_parts).strip()

                    finish_reason = first_cand.get("finishReason")
                    if finish_reason and finish_reason != "STOP":
                        return f"Response generation stopped: {finish_reason}"

                prompt_feedback = data.get("promptFeedback", {})
                if prompt_feedback.get("blockReason"):
                    return f"Prompt blocked by safety filters: {prompt_feedback.get('blockReason')}"

                return "Received unexpected response structure from Gemini API."
        except httpx.HTTPStatusError as e:
            try:
                err_data = e.response.json()
                err_msg = err_data.get("error", {}).get("message", e.response.text)
            except Exception:
                err_msg = e.response.text
            return f"Gemini API returned error ({e.response.status_code}): {err_msg}"
        except httpx.ConnectError:
            return "Unable to connect to Google Gemini API. Please check your network connection."
        except httpx.ReadTimeout:
            return "Google Gemini API timed out while generating a response."
        except Exception as e:
            return f"Error communicating with Gemini API: {str(e)}"
