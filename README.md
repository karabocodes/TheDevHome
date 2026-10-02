# TheDevHome

Karabo Khunou's developer portfolio — a full-stack application with an Angular frontend and a FastAPI chatbot backend.

## Project Structure

```
TheDevHome/
├── backend/                 # Python FastAPI chatbot API
│   ├── adapters/            # LLM provider adapters (Ollama, Anthropic)
│   ├── main.py              # FastAPI application entry point
│   ├── models.py            # Pydantic request/response models
│   ├── prompt.py            # System prompt builder
│   ├── requirements.txt     # Python dependencies
│   ├── test_backend.py      # Backend unit tests
│   ├── .env.example         # Environment variable template
│   └── .env                 # Local environment config (git-ignored)
├── frontend/                # Angular 20 SPA
│   ├── src/                 # Angular source code
│   ├── public/              # Static assets (images, data, favicon)
│   ├── angular.json         # Angular CLI configuration
│   ├── package.json         # Node.js dependencies & scripts
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── ...
├── .vscode/                 # VS Code workspace settings
├── .editorconfig            # Editor formatting rules
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v18+) and **npm**
- **Python** (3.11+)
- **Ollama** (for local LLM) — [ollama.com](https://ollama.com)

### Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your LLM provider settings

# Run the server
python main.py
```

The backend runs at **http://localhost:8000** with:
- `GET  /api/health` — health check
- `POST /api/chat`   — chatbot endpoint

> **Note:** If using Ollama (default), ensure it's running: `ollama serve`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the dev server
npm start
```

The frontend runs at **http://localhost:4200**

### Quick Start (Two Terminals)

| Terminal     | Directory   | Command                                          |
|-------------|-------------|--------------------------------------------------|
| **Backend**  | `backend/`  | `.venv\Scripts\activate` → `python main.py`      |
| **Frontend** | `frontend/` | `npm start`                                       |

### VS Code

Use the **Full Stack** compound launch configuration to start both backend and frontend simultaneously from the Run & Debug panel.

## Code Scaffolding

From the `frontend/` directory:

```bash
npx ng generate component component-name
```

## Building

```bash
cd frontend
npm run build
```

Build artifacts are stored in `frontend/dist/`.

## Running Tests

**Frontend:**
```bash
cd frontend
npm test
```

**Backend:**
```bash
cd backend
python -m pytest test_backend.py
```

## Additional Resources

- [Angular CLI Reference](https://angular.dev/tools/cli)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Ollama Documentation](https://ollama.com)
