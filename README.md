# Pro-Tasker Backend

## Overview

Backend API for **Pro-Tasker** — a full-stack task management application built as a Per Scholas capstone project (2026).  

This backend handles:
- Secure user registration & login (JWT authentication)
- Project & task CRUD operations
- Nested task routes under projects
- Protected endpoints (only authenticated users can access)

**Live API (Backend):** https://pro-tasker-capstone-backend.onrender.com  
**Live Frontend:** https://pro-tasker-capstone-frontend.onrender.com  

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">
</p>

## Features

- **JWT Authentication** (register, login, protected routes)
- **User Model**: email, hashed password (bcrypt), firstName, lastName
- **Project Model**: title, description, owner (user ref), createdAt
- **Task Model**: title, description, status (To Do / In Progress / Done), priority (Low / Medium / High), dueDate, startTime, endTime, project ref
- Full **CRUD** for projects and tasks
- Nested routes: `/projects/:id/tasks`
- Secure password hashing with bcryptjs
- CORS configured for frontend

## API Endpoints Overview

### Auth
- `POST /api/auth/register`  
  Body: `{ email, password, firstName, lastName }` → creates user & returns JWT
- `POST /api/auth/login`  
  Body: `{ email, password }` → returns JWT on success

### Projects (protected – need Authorization Bearer token)
- `GET /api/projects` → list all projects for logged-in user
- `POST /api/projects` → Body: `{ title, description }` → create new project
- `GET /api/projects/:id` → get single project details
- `PUT /api/projects/:id` → update project
- `DELETE /api/projects/:id` → delete project

### Tasks (nested under project – protected)
- `GET /api/projects/:projectId/tasks` → list tasks in project
- `POST /api/projects/:projectId/tasks` → Body: `{ title, description, status, priority, dueDate, startTime, endTime }`
- `PUT /api/projects/:projectId/tasks/:taskId` → update task (supports drag-and-drop time changes)
- `DELETE /api/projects/:projectId/tasks/:taskId` → delete task

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) for auth tokens
- bcryptjs for password hashing
- CORS middleware
- dotenv for environment variables
- Deployed on Render (Web Service)

## Installation (Local Development)

1. Clone the repository:
   git clone <your-repo-url>
   cd backend

2. Install dependencies:
- npm install

3. Create .env file in root:
    PORT=3000
    MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/protasker?retryWrites=true&w=majority
    JWT_SECRET=your-super-secret-key-here

4. Run the server:
    npm run dev   # or nodemon server.js

    Deployment

Deployed as Web Service on Render
Live API: https://pro-tasker-capstone-backend.onrender.com
Environment variables set on Render:
MONGODB_URI (Atlas connection string)
JWT_SECRET
PORT = 10000 (optional – Render auto-assigns)


## Challenges & Learnings

- Configuring CORS correctly for Render frontend domain
- Securing routes with JWT middleware
- Nested routes for tasks (/projects/:id/tasks)
- Environment variables injection on Render
- Debugging "Unexpected end of JSON input" (caused by missing CORS origin)

## Future Plans

- Task comments & attachments
- Real-time updates (Socket.io)
- Email notifications for due tasks
- Role-based access (admin/user)
- Task analytics & reports

## Resources

1. Express.js Official Guide
2. Mongoose (MongoDB ORM)
https://mongoosejs.com/docs/
Schemas & Models: https://mongoosejs.com/docs/schematypes.html
CRUD: https://mongoosejs.com/docs/queries.html
3. JWT Authentication Tutorial (very similar to your auth)
https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjshttps://dev.to/mrcyberwolf/jwt-authentication-in-nodejs-and-express-3l3e
4. bcryptjs (password hashing)
https://www.npmjs.com/package/bcryptjs
(Simple, no native C++ deps — good choice)
5. CORS Middleware
https://expressjs.com/en/resources/middleware/cors.html

