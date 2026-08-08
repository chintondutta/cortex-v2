# Cortex

Cortex is an AI-powered app-generation platform, in the spirit of v0.dev or Bolt.new. Describe a UI or feature in plain text, and Cortex generates, runs, and previews a fully functional Next.js application in a live cloud sandbox in real time.

**Live demo:** [cortex.chintondutta.com](https://cortex.chintondutta.com)

---

## Features

- **Conversational code generation** — chat with an AI agent that produces complete, production-quality Next.js apps from a plain-text prompt.
- **Live sandboxed preview** — generated code runs instantly in an isolated [E2B](https://e2b.dev/) cloud sandbox with hot reload, so you see a live demo without any local setup.
- **File explorer + code view** — a resizable split panel for browsing generated files and reading code alongside the live preview.
- **Persistent project history** — each project stores its full conversation thread in PostgreSQL, so you can return and iterate on prior work.
- **Multi-agent pipeline** — separate agents handle code generation (GPT-4.1), response summarization (GPT-4o), and fragment title generation (GPT-4o) in sequence.
- **Authentication** — Clerk-based sign-up/sign-in with per-user project isolation.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| AI / Agents | Inngest Agent Kit, OpenAI GPT-4.1 & GPT-4o |
| Background jobs | Inngest (durable, event-driven function execution) |
| Code sandboxing | E2B Code Interpreter |
| Database | PostgreSQL via Prisma ORM |
| API layer | tRPC + TanStack Query |
| Auth | Clerk |
| UI | Shadcn UI, Tailwind CSS, Radix UI, Lucide React |
| Deployment | Vercel |

## Architecture

- **Multi-agent network** built with Inngest Agent Kit: a `code-agent` network (max 8 iterations) runs until a `<task_summary>` is produced, then hands off to title/response generator agents.
- **E2B sandbox lifecycle** — a sandbox is created per request, files are written incrementally via tool calls (`createOrUpdateFiles`, `terminal`, `readFiles`), and the live preview URL is returned to the frontend.
- **Event-driven execution** — user messages trigger a `code-agent/run` Inngest event; generation work runs in the background, decoupled from the HTTP request.
- **Type-safe full stack** — tRPC routers connect directly to Prisma, giving end-to-end type safety from the database to the client.

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g. [Neon](https://neon.tech/))
- API keys for [OpenAI](https://platform.openai.com/), [E2B](https://e2b.dev/), and [Clerk](https://clerk.com/)

### Setup

```bash
git clone https://github.com/chintondutta/cortex-v2.git
cd cortex-v2
npm install
cp .env.example .env   # then fill in the values below
npx prisma migrate dev
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key used by the code-generation agents |
| `E2B_API_KEY` / `E2B_ACCESS_TOKEN` | E2B credentials for launching code sandboxes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk authentication keys |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app (e.g. `http://localhost:3000`) |

See `.env.example` for the full list.

## Project Structure

```
src/
├── app/            # Next.js App Router pages and API routes
├── components/     # Shared UI components (incl. code viewer)
├── modules/        # Feature modules (home, projects, messages, usage)
├── inngest/        # Background job / agent functions
├── trpc/           # tRPC routers and client setup
├── hooks/          # React hooks
└── lib/            # Shared utilities
prisma/             # Database schema
```

## License

MIT
