# PrepAI

PrepAI is an AI-powered interview preparation project focused on helping you practice common (and role-specific) interview questions, receive actionable feedback, and track improvement over time.

> Status: early-stage / in-progress (update this section as the project matures)

---

## Features

- **Mock interview sessions** (prompt-driven Q&A)
- **Role/skill-based question sets** (customizable prompts/categories)
- **Feedback & scoring** (strengths, gaps, and suggested improvements)
- **Progress tracking** across sessions (notes, history, and trends)
- **Configurable**: swap prompts, rubrics, and evaluation criteria

---

## Tech Stack

This repository’s exact stack depends on the current code in `KabriAcid/PrepAI`.

Typical components you may find in a project like this:
- Frontend UI (web or mobile)
- Backend API / server
- AI provider integration (LLM calls)
- Storage for sessions & user settings

> If you tell me what framework you’re using (React, Next.js, Flask, FastAPI, etc.), I can tailor this section precisely.

---

## Getting Started

### 1) Clone
```bash
git clone https://github.com/KabriAcid/PrepAI.git
cd PrepAI
```

### 2) Configure environment variables
Create a `.env` file (or equivalent for your stack) and set your API keys and config.

Example:
```bash
# AI Provider
OPENAI_API_KEY=your_key_here

# App Config
APP_ENV=development
```

### 3) Install dependencies
Use the package manager for your project:

```bash
# Node example
npm install
# or
yarn
# or
pnpm install
```

### 4) Run locally
```bash
# Node example
npm run dev
```

---

## Usage

1. Start the app locally.
2. Choose a target role (e.g., “Frontend Engineer”, “Data Analyst”).
3. Run a mock interview session and answer questions.
4. Review feedback, iterate, and track progress.

---

## Project Structure (suggested)

You can adjust these names to match your repo:

- `frontend/` — UI client
- `backend/` — API/server code
- `prompts/` — question banks, rubrics, scoring instructions
- `docs/` — documentation and architecture notes

---

## Roadmap (ideas)

- Add question difficulty levels and timed rounds
- Export session feedback to PDF/Markdown
- Add resume-based question generation (upload + extraction)
- Add multi-rubric scoring (behavioral, technical depth, clarity)
- Add authentication and saved user profiles

---

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-change`
3. Commit changes: `git commit -m "Add my change"`
4. Push: `git push origin feature/my-change`
5. Open a Pull Request

---

## License

Add a license you want to use (MIT, Apache-2.0, GPL-3.0, etc.).  
If you’re unsure, MIT is a common choice for small open-source projects.

---

## Contact

Created by **@KabriAcid**.
