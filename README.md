# Portfolio API Server

Backend API for [kunalgaur.in](https://kunalgaur.in)—a NestJS application that serves status, weather, quotes, blog posts (Hashnode), projects, experience, education, photos, contact, and more.

## Tech stack

- **Runtime:** Node.js  
- **Framework:** [NestJS](https://nestjs.com)  
- **Database:** PostgreSQL (TypeORM)  
- **Cache:** Redis  
- **Validation:** class-validator, Zod  
- **Storage / media:** Cloudinary  

## Prerequisites

- Node.js 22+  
- PostgreSQL  
- Redis  
- (Optional) Docker & Docker Compose  

## Project setup

```bash
npm install
```

Copy `.env.example` to `.env` and set the required variables (see [Environment variables](#environment-variables)).

## Running the app

```bash
# Development (watch mode)
npm run start:dev

# One-off run
npm run start

# Production (after build)
npm run build
npm run start:prod
```

By default the server listens on the port set in `PORT` (e.g. `3001`).

## Environment variables

All of the following are validated at startup via `src/utils/config.ts`. Missing or invalid values will prevent the app from starting.

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP server port (e.g. `3001`) |
| `NODE_ENV` | `development`, `testing`, or `production` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins |
| `SECURITY_KEY` | App security key |
| `WEATHER_API_SECRET_KEY` | Weather API key |
| `WEATHER_API_BASE_URL` | Weather API base URL |
| `ZEN_QUOTES_BASE_URL` | Zen Quotes API base URL |
| `POSTGRES_DB_HOST` | PostgreSQL host |
| `POSTGRES_DB_PORT` | PostgreSQL port |
| `POSTGRES_DB_NAME` | Database name |
| `POSTGRES_DB_USERNAME` | Database user |
| `POSTGRES_DB_PASSWORD` | Database password |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET_KEY` | Cloudinary secret |
| `CLOUDINARY_ENVIRONMENT_NAME` | Cloudinary cloud name |
| `REDIS_HOST` | Redis host |
| `REDIS_PORT` | Redis port |
| `REDIS_USERNAME` | Redis username |
| `REDIS_PASSWORD` | Redis password |
| `HASHNODE_BASE_URL` | Hashnode GraphQL API (e.g. `https://gql.hashnode.com`) |
| `HASHNODE_ACCESS_TOKEN` | Hashnode personal access token |
| `GITHUB_USERNAME` | GitHub username (for projects) |
| `GITHUB_BASE_URL` | GitHub API base URL |
| `GITHUB_ACCESS_TOKEN` | GitHub personal access token |

Create a `.env` file in the project root with these variables before running the server.

## API overview

Base URL is `http://localhost:<PORT>` (or your deployed host). Responses are wrapped by a global success interceptor; errors are normalized by the exception filter.

| Module | Method | Path | Description |
|--------|--------|------|-------------|
| App | GET | `/` | Root / info |
| App | GET | `/health-check` | Health check |
| Status | GET | `/status` | Online/offline by working hours (IST) |
| Weather | GET | `/weather` | Weather data |
| Quote | GET | `/quote` | Quote of the day (cached via Redis) |
| Posts | GET | `/posts` | List blog posts (Hashnode; optional `page`, `pageSize`) |
| Posts | GET | `/posts/:slug` | Single post with full content (Hashnode) |
| Projects | GET | `/projects` | List projects |
| Experience | GET | `/experience` | List experience entries |
| Experience | POST | `/experience` | Create experience |
| Experience | GET | `/experience/:id` | Get experience by id |
| Experience | PUT | `/experience/:id` | Update experience |
| Experience | DELETE | `/experience/:id` | Delete experience |
| Education | GET | `/education` | List education |
| Education | POST | `/education` | Create education |
| Education | GET | `/education/:id` | Get by id |
| Education | PATCH | `/education/:id` | Update |
| Education | DELETE | `/education/:id` | Delete |
| Photos | GET | `/photos` | List photos |
| Photos | POST | `/photos` | Upload / add photo |
| Contact | GET | `/contact` | List contact messages |
| Contact | POST | `/contact` | Submit contact form |
| Contact | GET | `/contact/:id` | Get message by id |
| Date | GET | `/date` | Current date/time (IST) |

Global middleware: request validation, request context (e.g. request id, IP, user-agent), and rate limiting.

## Docker

Build and run with Docker Compose (maps host port 8000 to container port 3000):

```bash
docker compose up --build
```

The API is then available at `http://localhost:8000`. Ensure a `.env` file is present (or pass env another way); the Compose file loads `env_file: .env`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled app |
| `npm run start:dev` | Run in watch mode |
| `npm run start:prod` | Run production build (`node dist/main`) |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run test` | Unit tests |
| `npm run test:e2e` | E2E tests |
| `npm run test:cov` | Test coverage |

## Project structure (high level)

```
src/
├── adapters/       # External APIs (Hashnode, weather, zen-quotes, Cloudinary)
├── core/           # Redis, Postgres, base entities, context
├── helpers/        # Pipes, filters, interceptors, middleware
├── module/         # Feature modules (posts, projects, experience, etc.)
├── utils/          # Config, constants, errors
└── main.ts         # Bootstrap
```

## License

UNLICENSED (private). See repository or author for terms.
