import unittest
import os
import sys

# Ensure server modules are resolvable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models import ProjectChatContext, ChatRequest
from prompt import build_system_prompt

class BackendUnitTests(unittest.TestCase):
    def test_system_prompt_global_knt(self):
        prompt = build_system_prompt(None)
        self.assertIn("KNT Software Solutions", prompt)
        self.assertIn("Karabo Khunou", prompt)
        self.assertIn("Nqobile Buthelezi", prompt)
        self.assertIn("Tebogo Mkhize", prompt)
        self.assertIn("CRITICAL SAFETY & GROUNDING RULES", prompt)
        self.assertIn("Currently viewing: KNT Corporate Portal", prompt)

    def test_system_prompt_case_study_context(self):
        ctx = ProjectChatContext(
            slug="zencart",
            title="ZenCart Enterprise Architecture",
            shortDescription="Spring Boot e-commerce backend",
            longDescription="High-volume enterprise architecture with MySQL",
            techStack=["Java 17", "Spring Boot 3.4.2", "MySQL"],
            highlights=["Logical model design"],
            challenges=["Entity isolation"],
            decisions=["Spring Data JPA repository pattern"]
        )
        prompt = build_system_prompt(ctx)
        self.assertIn("ACTIVE CASE STUDY CONTEXT", prompt)
        self.assertIn("Title: ZenCart Enterprise Architecture", prompt)
        self.assertIn("Java 17", prompt)
        self.assertIn("Spring Data JPA repository pattern", prompt)
        self.assertIn("Entity isolation", prompt)

    def test_contextual_difference_between_case_studies(self):
        ctx_a = ProjectChatContext(slug="zencart", title="ZenCart Enterprise", techStack=["Java 17", "Spring Boot"])
        ctx_b = ProjectChatContext(slug="sukuma", title="sukuma Fleet Logistics", techStack=["Angular 20", "TypeScript"])

        prompt_a = build_system_prompt(ctx_a)
        prompt_b = build_system_prompt(ctx_b)

        self.assertIn("ZenCart Enterprise", prompt_a)
        self.assertNotIn("sukuma Fleet Logistics", prompt_a.split("ACTIVE CASE STUDY CONTEXT")[1])

        self.assertIn("sukuma Fleet Logistics", prompt_b)
        self.assertNotIn("ZenCart Enterprise", prompt_b.split("ACTIVE CASE STUDY CONTEXT")[1])

    def test_fastapi_app_routes(self):
        from fastapi.testclient import TestClient
        from main import app

        client = TestClient(app)
        
        # Test health endpoint
        health_res = client.get("/api/health")
        self.assertEqual(health_res.status_code, 200)
        data = health_res.json()
        self.assertEqual(data["status"], "online")
        self.assertIn("provider", data)

        # Test empty chat message rejection (HTTP 400)
        empty_res = client.post("/api/chat", json={"message": "   "})
        self.assertEqual(empty_res.status_code, 400)

    def test_gemini_adapter_configuration(self):
        import asyncio
        from adapters.gemini_adapter import GeminiAdapter

        adapter = GeminiAdapter(api_key="", model="gemini-1.5-flash")
        self.assertEqual(adapter.provider_name, "Google Gemini")
        self.assertEqual(adapter.model_name, "gemini-1.5-flash")

        # Without an API key, it should safely inform the user without crashing
        res = asyncio.run(adapter.generate_response("System prompt", [{"role": "user", "content": "Hi"}]))
        self.assertIn("Gemini API key is not configured", res)

if __name__ == "__main__":
    unittest.main()

