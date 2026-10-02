import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest, ChatResponse
from prompt import build_system_prompt
from adapters.base import LLMAdapter
from adapters.ollama_adapter import OllamaAdapter
from adapters.anthropic_adapter import AnthropicAdapter

load_dotenv()

app = FastAPI(
    title="TheDevHome Chatbot API",
    description="Secure LLM Backend Proxy for Karabo Khunou Developer Portfolio",
    version="1.0.0"
)

# CORS configuration to allow Angular development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "http://localhost:4201",
        "http://127.0.0.1:4201",
        "https://karabocodes.github.io"
    ],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_adapter() -> LLMAdapter:
    provider = os.getenv("LLM_PROVIDER", "ollama").lower()
    if provider == "anthropic":
        return AnthropicAdapter()
    return OllamaAdapter()

@app.get("/api/health")
async def health_check():
    adapter = get_adapter()
    return {
        "status": "online",
        "provider": adapter.provider_name,
        "model": adapter.model_name
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    system_prompt = build_system_prompt(request.projectContext)
    
    # Cap conversation history to the last 8 messages to prevent context drift and latency
    recent_history = [
        {"role": msg.role, "content": msg.content}
        for msg in request.conversationHistory[-8:]
    ]
    recent_history.append({"role": "user", "content": request.message})

    adapter = get_adapter()
    reply = await adapter.generate_response(system_prompt, recent_history)

    return ChatResponse(
        reply=reply,
        provider=adapter.provider_name,
        model=adapter.model_name
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
