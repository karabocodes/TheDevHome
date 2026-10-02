import os
import httpx
from typing import List, Dict
from .base import LLMAdapter

class OllamaAdapter(LLMAdapter):
    def __init__(self, base_url: str = None, model: str = None):
        self._base_url = (base_url or os.getenv("OLLAMA_BASE_URL") or "http://localhost:11434").rstrip("/")
        self._model = model or os.getenv("OLLAMA_MODEL") or "gemma4:e4b"

    @property
    def provider_name(self) -> str:
        return "Ollama (Local)"

    @property
    def model_name(self) -> str:
        return self._model

    async def generate_response(self, system_prompt: str, messages: List[Dict[str, str]]) -> str:
        url = f"{self._base_url}/api/chat"
        payload_messages = [{"role": "system", "content": system_prompt}]
        for m in messages:
            payload_messages.append({"role": m["role"], "content": m["content"]})

        payload = {
            "model": self._model,
            "messages": payload_messages,
            "stream": False,
            "options": {
                "temperature": 0.2,
                "num_predict": 250,
                "num_ctx": 2048
            }
        }

        try:
            timeout_cfg = httpx.Timeout(180.0, connect=10.0)
            async with httpx.AsyncClient(timeout=timeout_cfg) as client:
                res = await client.post(url, json=payload)
                res.raise_for_status()
                data = res.json()
                return data.get("message", {}).get("content", "").strip()
        except httpx.ConnectError:
            return (
                "Unable to connect to local Ollama service. "
                "Please ensure Ollama is running (`ollama serve`)."
            )
        except httpx.ReadTimeout:
            return (
                "The local Ollama model timed out while generating a response. "
                "It may be loading into memory or the machine is under heavy load."
            )
        except Exception as e:
            return f"Error communicating with local AI model: {str(e)}"
