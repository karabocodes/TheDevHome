from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ProjectChatContext(BaseModel):
    slug: str
    title: str
    shortDescription: Optional[str] = None
    longDescription: Optional[str] = None
    techStack: List[str] = Field(default_factory=list)
    highlights: List[str] = Field(default_factory=list)
    challenges: List[str] = Field(default_factory=list)
    decisions: List[str] = Field(default_factory=list)

class ChatRequest(BaseModel):
    message: str
    projectContext: Optional[ProjectChatContext] = None
    conversationHistory: List[ChatMessage] = Field(default_factory=list)

class ChatResponse(BaseModel):
    reply: str
    provider: str
    model: str
