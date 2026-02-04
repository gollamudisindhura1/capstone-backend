# Pro-Tasker Backend

## Overview

Backend API for Pro-Tasker this is a full-stack task management application built as a Per Scholas capstone project (2026).

This backend handles:
- User registration & login (JWT authentication)
- Project CRUD operations
- Task CRUD operations (with time tracking & priority/status)
- Secure routes for authenticated users only

Live API:  
Frontend: 

## Features

- **JWT Authentication** (register, login, protected routes)
- **User Model**: email, hashed password, firstName, lastName
- **Project Model**: title, description, owner (user), createdAt
- **Task Model**: title, description, status (To Do / In Progress / Done), priority (Low / Medium / High), dueDate, startTime, endTime
- Full **CRUD** for projects and tasks
- Tasks belong to projects (nested routes: `/projects/:id/tasks`)
- Secure password hashing with bcrypt

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose (database)
- JWT (jsonwebtoken) for auth tokens
- bcryptjs (password hashing)
- CORS (cross-origin requests)
- dotenv (environment variables)

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

All protected routes return 401 if no valid token.

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