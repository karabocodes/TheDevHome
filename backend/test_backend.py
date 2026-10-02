import unittest
import os
import sys

# Ensure server modules are resolvable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models import ProjectChatContext, ChatRequest
from prompt import build_system_prompt

class BackendUnitTests(unittest.TestCase):
    def test_system_prompt_global(self):
        prompt = build_system_prompt(None)
        self.assertIn("Karabo Khunou", prompt)
        self.assertIn("CRITICAL SAFETY & GROUNDING RULES", prompt)
        self.assertIn("Currently viewing: Portfolio Home", prompt)

    def test_system_prompt_project_context(self):
        ctx = ProjectChatContext(
            slug="zencart",
            title="ZenCart",
            shortDescription="Spring Boot e-commerce backend",
            longDescription="Deep architecture with MySQL",
            techStack=["Java 17", "Spring Boot", "MySQL"],
            highlights=["Logical model design"],
            challenges=["Entity isolation"],
            decisions=["Spring Data JPA repository pattern"]
        )
        prompt = build_system_prompt(ctx)
        self.assertIn("ACTIVE PROJECT CONTEXT", prompt)
        self.assertIn("Title: ZenCart", prompt)
        self.assertIn("Java 17", prompt)
        self.assertIn("Spring Data JPA repository pattern", prompt)
        self.assertIn("Entity isolation", prompt)

    def test_contextual_difference_between_projects(self):
        ctx_a = ProjectChatContext(slug="zencart", title="ZenCart", techStack=["Java 17", "Spring Boot"])
        ctx_b = ProjectChatContext(slug="sukuma", title="sukuma", techStack=["Angular 20", "TypeScript"])

        prompt_a = build_system_prompt(ctx_a)
        prompt_b = build_system_prompt(ctx_b)

        self.assertIn("ZenCart", prompt_a)
        self.assertNotIn("sukuma", prompt_a.split("ACTIVE PROJECT CONTEXT")[1])

        self.assertIn("sukuma", prompt_b)
        self.assertNotIn("ZenCart", prompt_b.split("ACTIVE PROJECT CONTEXT")[1])

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

if __name__ == "__main__":
    unittest.main()
