import os
import httpx
from typing import List, Dict
from .base import LLMAdapter

class AnthropicAdapter(LLMAdapter):
    def __init__(self, api_key: str = None, model: str = None):
        self._api_key = api_key or os.getenv("ANTHROPIC_API_KEY", "")
        self._model = model or os.getenv("ANTHROPIC_MODEL", "claude-3-5-sonnet-20241022")

    @property
    def provider_name(self) -> str:
        return "Anthropic Claude"

    @property
    def model_name(self) -> str:
        return self._model

    async def generate_response(self, system_prompt: str, messages: List[Dict[str, str]]) -> str:
        if not self._api_key:
            return "Anthropic API key is not configured on the server."

        url = "https://api.anthropic.com/v1/messages"
        headers = {
            "x-api-key": self._api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }

        # Filter and structure messages for Anthropic (user and assistant roles only in messages list)
        formatted_messages = [
            {"role": m["role"], "content": m["content"]}
            for m in messages
            if m["role"] in ["user", "assistant"]
        ]

        payload = {
            "model": self._model,
            "max_tokens": 1024,
            "system": system_prompt,
            "messages": formatted_messages,
            "temperature": 0.2
        }

        try:
            async with httpx.AsyncClient(timeout=45.0) as client:
                res = await client.post(url, headers=headers, json=payload)
                res.raise_for_status()
                data = res.json()
                content_blocks = data.get("content", [])
                if content_blocks and content_blocks[0].get("type") == "text":
                    return content_blocks[0].get("text", "").strip()
                return "Received unexpected response structure from Anthropic API."
        except httpx.HTTPStatusError as e:
            return f"Anthropic API returned status {e.response.status_code}: {e.response.text}"
        except Exception as e:
            return f"Error contacting Anthropic API: {str(e)}"
