# codeMate

codeMate is a collaborative coding platform for discovering and solving programming problems. It includes a browser-based code editor, problem submissions, personal problem management, bookmarks, and AI-assisted code review.

## Features

- Browse public problems and explore them by topic
- Search problems by title or topic
- Solve problems in JavaScript, Python, C++, and Java
- Run code against public test cases and submit solutions
- Get AI-generated feedback about code complexity, bugs, and optimality
- Bookmark problems and review submission history
- View profile analytics and leaderboard details
- Create and manage private problems
- Access collaborative coding groups

## Tech stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Code editor:** Monaco Editor
- **Code execution:** Judge0
- **AI reviews:** Google Gemini

## Repository layout

```text
backend/
  src/
    controllers/  API and application logic
    db/           MongoDB connection
    middlewares/  Authentication middleware
    models/       Mongoose schemas
    routes/       Express API routes
    utils/        Code execution and language wrappers
  package.json

frontend/
  src/
    components/   Shared UI components
    context/      Authentication state
    layouts/      Page layout components
    pages/        Dashboard, problems, profiles, and authentication
    schema/       Problem form validation
    services/     API client configuration
  package.json
```

## Prerequisites

- Node.js and npm
- A MongoDB instance
- A Google Gemini API key for AI review features
- Internet access for Judge0 code execution

## Configuration

Create `backend/.env` with the values needed for your environment:

```env
MONGO_URI=mongodb://127.0.0.1:27017/codemate
GEMINI_API_KEY=your-gemini-api-key
CORS_ORIGIN=http://localhost:5173
PORT=5000
```

The frontend API client is configured to use `http://localhost:5000/api/v1`, so run the backend on port `5000` for local development.

## Run locally

Open two terminals from the repository root.

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:5000/api/v1`.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

## Useful commands

Run these from `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Build the frontend for production
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

Run this from `backend/`:

```bash
npm run dev      # Start the backend with nodemon
```

## API routes

The backend mounts these API route groups under `/api/v1`:

- `/users` — registration, login, authentication checks, logout, and username updates
- `/problems` — problem browsing, search, creation, execution, submissions, analytics, and AI review
- `/bookmarks` — bookmark operations
- `/groups` — group operations

## Security

Use your own credentials in local environment configuration. Do not commit API keys, database credentials, or other secrets. If a credential has ever been committed to the repository, revoke or rotate it before using the project.
