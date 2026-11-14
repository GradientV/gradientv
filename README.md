# GradientV website and client portal

The code behind [gradientv.com](https://gradientv.com): the website of GradientV, a company that builds websites and software for small businesses, and the client portal behind its sign-in page.

- **The website** is a React app written in TypeScript. Every public page is prerendered to plain HTML at build time, in English, Spanish and Simplified Chinese, so link previews, search engines and AI tools see the whole page without running JavaScript.
- **The client portal** is where clients sign in. They send change requests for their sites and see their visitor numbers. When their own website sends them, they also see the self-assessment results and newsletter signups it collected.
- **The API** behind the portal is an Express server over MongoDB. It deploys with the site as a single Vercel Function.

**Stack:** TypeScript in strict mode on both sides. React 19, React Router 8, Tailwind CSS 4 and Vite 8 for the website. Express 5 and MongoDB (Mongoose) for the server. Vercel for hosting.

## How it's organized

```
api/index.ts        the Vercel Function: hands every /api request to the Express app
client/             the website and the portal pages
  src/views/        one file per page
  src/content/      every word on the site, one file per language
  src/data/         the page list, the team, and the structured data built from them
  scripts/          prerender.ts writes one HTML file per page after the build
server/             the API
  src/routes/       which function answers which URL
  src/controllers/  those functions
  src/services/     passwords, sessions, site keys, analytics, notifications
  src/models/       the MongoDB collections
  src/dto/          what each answer sends back, and nothing more
  scripts/          command-line tools for making logins and site keys
shared/portal.ts    the shape of every API answer, used by both the server and the client
```

## How the portal protects client data

- Passwords are stored only as bcrypt hashes. Session tokens, invite links and site keys are stored only as SHA-256 hashes, so a copy of the database can't be used to sign in.
- A wrong email and a wrong password get the same answer in the same amount of time, so the sign-in form can't be used to find out who is a client. Five wrong passwords in a row pause the account for 15 minutes.
- Sessions live in httpOnly, SameSite cookies that scripts on the page can't read, sent only over HTTPS in production.
- Every portal route reads the client from the session, never from the request, so one client can't ask for another's data.
- Request bodies are treated as untrusted (`unknown`) and checked before anything reaches MongoDB.
- The types in `shared/portal.ts` are what the server's DTOs return and what the pages read. A change on one side that would break the other fails the type check.

## Running it locally

You need Node.js 24 and MongoDB.

```bash
npm install
cp server/.env.example server/.env
npm run dev
```

The site runs at http://localhost:5173 and the API at http://localhost:4000. Vite passes `/api` requests through to the API. To make a login for testing:

```bash
npm run add-client -- "Client Name" owner@example.com
```

It prints a one-time link for setting the password.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the API and the website together |
| `npm run build` | Type-checks everything, builds the site, and prerenders every page into `client/dist` |
| `npm run typecheck` | Type-checks the client, the server and the shared types |
| `npm run lint` | Lints with oxlint |
| `npm run add-client` | Makes a login and prints its invite link |
| `npm run site-key` | Makes the key a client's own website uses to send results and signups to the portal |
| `npm run import-site-data` | Imports a client's older results or signups from a CSV export |
| `npm run check-analytics` | Checks that Vercel's Web Analytics API answers for a project |

The scripts that touch the database use the local one unless `--live` is added, which reads `server/.env.production` instead.

## Deployment

Vercel runs `npm run build`, serves `client/dist`, and turns `api/index.ts` into a function. `vercel.json` sends every `/api/...` request to it. The server's settings (`MONGODB_URI`, `VERCEL_TOKEN`, `VERCEL_TEAM`, `SLACK_WEBHOOK_URL`) are set in the Vercel project and never in this repository. `server/.env.example` lists them.

## Common changes

- **Wording:** `client/src/content/en.ts`, and the same key in `es.ts` and `zh.ts`. The type check flags a key that a language is missing.
- **A team member:** an entry in `TEAM` in `client/src/data/team.ts`, and their role and bio under `team.members` in the three content files.
- **A client logo:** the image in `client/public/images/clients/` and an entry in `CLIENTS` in `client/src/data/site.ts`.
- **A page:** an entry in `client/src/data/pages.ts`, a view in `client/src/views/`, and a line in `VIEWS` in `client/src/App.tsx`. The sitemap and `llms.txt` pick it up by themselves.

## License

Copyright (c) 2026 GradientV LLC. All rights reserved. The code is public so it can be read; it isn't licensed for reuse. See [LICENSE](LICENSE).
