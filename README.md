# KNT Software Solutions

Corporate web platform and technical advisory API for **KNT Software Solutions** — an enterprise software engineering consultancy founded by **Karabo Khunou**, **Nqobile Buthelezi**, and **Tebogo Mkhize**.

---

## Founding Leadership (KNT)

- **Karabo Khunou (K)** — *Partner & Principal Systems Architect*  
  Enterprise backend architecture, Spring Boot 3.4 / Java 17 microservices, relational data modeling, and high-concurrency transactional systems.
- **Nqobile Buthelezi (N)** — *Partner & Head of Cloud Strategy & Infrastructure*  
  Cloud architecture (AWS/GCP), CI/CD automation, system reliability engineering, compliance standards, and DevOps modernization.
- **Tebogo Mkhize (T)** — *Partner & Director of Mobile & Digital Platforms*  
  Native iOS (Swift) engineering, Apple Human Interface Guidelines, interactive 3D WebGL (Three.js), and enterprise design systems.

---

## Core Practice Areas

1. **Enterprise Backend & Microservices:** Java 17, Spring Boot 3.4.2, Spring Security, Spring Data JPA, and MySQL/PostgreSQL.
2. **Cloud Infrastructure & DevOps:** Automated CI/CD, container orchestration, high availability, and 99.99% target reliability.
3. **Reactive Web Engineering:** Angular 20 standalone architecture, fine-grained signals, and high-performance design systems.
4. **Interactive 3D WebGL:** Browser-native 3D graphics, model pipelines, and audio-synchronized avatar rendering (Three.js & R3F).
5. **Native Mobile & Banking Solutions:** Institutional-grade iOS applications in Swift with strict Apple HIG compliance.
6. **Architecture Audits & Advisory:** Deep-dive code reviews, performance bottleneck triage, and technical debt remediation.

---

## Project Structure

```
TheDevHome/
├── backend/                 # Python FastAPI AI Advisory Backend
│   ├── adapters/            # LLM provider adapters (Ollama, Anthropic)
│   ├── main.py              # FastAPI application entry point
│   ├── models.py            # Pydantic request/response models
│   ├── prompt.py            # KNT system prompt builder
│   ├── requirements.txt     # Python dependencies
│   ├── test_backend.py      # Backend unit tests
│   ├── .env.example         # Environment variable template
│   └── .env                 # Local environment config (git-ignored)
├── frontend/                # Angular 20 Corporate Web Portal
│   ├── src/                 # Angular standalone source code
│   ├── public/              # Static assets, company metadata, case studies
│   │   ├── data/
│   │   │   ├── company.json # KNT profile, partners & services data
│   │   │   └── projects.json# Case studies & reference architectures
│   │   └── images/          # Diagrams and SVG assets
│   ├── angular.json         # Angular CLI configuration
│   ├── package.json         # Node.js dependencies & scripts
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── tsconfig.json        # TypeScript configuration
├── .vscode/                 # VS Code workspace settings
├── .editorconfig            # Editor formatting rules
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18+) and **npm**
- **Python** (3.11+)
- **Ollama** (for local LLM advisory assistant) — [ollama.com](https://ollama.com)

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
# Edit .env with your LLM provider settings (Ollama / Anthropic)

# Run the server
python main.py
```

The backend runs at **http://localhost:8000** with:
- `GET  /api/health` — health check
- `POST /api/chat`   — KNT technical advisory assistant endpoint

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the dev server
npm start
```

The corporate web portal runs at **http://localhost:4200**.

### Quick Start (Two Terminals)

| Terminal     | Directory   | Command                                          |
|-------------|-------------|--------------------------------------------------|
| **Backend**  | `backend/`  | `.venv\Scripts\activate` → `python main.py`      |
| **Frontend** | `frontend/` | `npm start`                                       |

---

## Running Tests

**Backend:**
```bash
cd backend
python -m pytest test_backend.py
```

**Frontend:**
```bash
cd frontend
npm run build
```

---

## Contact & Consultation

- **Email:** [consult@knt-solutions.com](mailto:consult@knt-solutions.com)
- **Direct Partner:** [karabo@knt-solutions.com](mailto:karabo@knt-solutions.com)
- **Headquarters:** Gauteng, South Africa (Available for Global Remote Engagements)
- **Delivery Standards:** 24 Business Hours SLA Response
