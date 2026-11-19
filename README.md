# CodeMate

CodeMate is an AI-powered collaborative coding platform designed to make programming practice more personalized and engaging. It allows users to discover and solve coding problems, generate custom challenges using AI, manage personal problem collections, and collaborate through private coding groups.

## Features

- **Problem Discovery:** Browse, search, and explore public coding problems by title or topic.
- **Multi-Language Code Editor:** Write and execute code in JavaScript, Python, C++, and Java using Monaco Editor.
- **AI-Powered Problem Generation:** Generate custom coding problems when existing platforms don't offer suitable challenges.
- **Personal Problem Wallet:** Save and manage AI-generated and private coding problems for future practice.
- **Private Coding Groups:** Create private groups with up to 10 members to collaborate and track each other's coding progress.
- **AI Code Review:** Get AI-generated feedback on code complexity, potential bugs, and optimization.
- **Code Submissions:** Run solutions against public test cases and maintain submission history.
- **Bookmarks:** Save interesting problems for later practice.
- **Profile Analytics & Leaderboard:** Monitor coding activity, performance, and progress.

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Code Editor:** Monaco Editor
- **Code Execution:** Judge0
- **AI Integration:** Google Gemini

## Repository Structure

```text
backend/
  src/
    controllers/   API and application logic
    db/            MongoDB connection
    middlewares/   Authentication middleware
    models/        Mongoose schemas
    routes/        Express API routes
    utils/         Code execution and language wrappers
  package.json

frontend/
  src/
    components/    Shared UI components
    context/       Authentication state
    layouts/       Page layouts
    pages/         Dashboard, problems, profiles, authentication
    schema/        Problem form validation
    services/      API client configuration
  package.json
```

## Prerequisites

- Node.js and npm
- MongoDB instance
- Google Gemini API key for AI-powered features
- Internet
