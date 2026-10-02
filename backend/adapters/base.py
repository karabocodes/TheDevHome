from abc import ABC, abstractmethod
from typing import List, Dict

class LLMAdapter(ABC):
    @abstractmethod
    async def generate_response(self, system_prompt: str, messages: List[Dict[str, str]]) -> str:
        """
        Generate a conversational response given a system prompt and formatted message list.
        """
        pass

    @property
    @abstractmethod
    def provider_name(self) -> str:
        pass

    @property
    @abstractmethod
    def model_name(self) -> str:
        pass
