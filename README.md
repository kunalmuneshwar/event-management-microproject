# Event Management MERN Project

A full-stack Event Management system built with MongoDB, Express, React, and Node.js.

## What This Project Does

### Admin section
- Create events
- Update events
- Delete events
- View participant requests
- Approve or reject participant requests
- Create Open or Private events
  - Open event: registration is auto-approved
  - Private event: registration stays pending until admin decision

### User section
- View all events
- View event details
- Register for events
- Track registration status from dashboard

## Tech Stack
- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure

- backend
  - src/config
  - src/controllers
  - src/middleware
  - src/models
  - src/routes
  - src/index.js
- frontend
  - src/components
  - src/context
  - src/pages
  - src/services

## Frontend Pages and Routes

Public routes:
- /
- /login
- /admin/login
- /admin/signup
- /user/login
- /user/signup

Protected routes:
- /admin/dashboard
- /user/dashboard
- /user/events
- /user/events/:eventId

## Backend API Routes

Base URL: http://localhost:5000

Health:
- GET /api/health

Auth:
- POST /api/auth/admin/signup
- POST /api/auth/admin/login
- POST /api/auth/user/signup
- POST /api/auth/user/login
- GET /api/auth/me

Events:
- GET /api/events
- GET /api/events/:eventId
- POST /api/events/:eventId/register

Admin (requires admin token):
- GET /api/admin/dashboard
- GET /api/admin/events
- POST /api/admin/events
- PUT /api/admin/events/:eventId
- DELETE /api/admin/events/:eventId
- GET /api/admin/events/:eventId/requests
- PATCH /api/admin/registrations/:registrationId/decision

User (requires user token):
- GET /api/user/dashboard
- GET /api/user/registrations

## Event Data Shape

Required fields:
- name
- shortDescription
- date
- tags

Optional behavior field:
- visibility: open or private

## Setup

## 1) Install dependencies

From project root:

- cd backend
- npm install
- cd ../frontend
- npm install

## 2) Configure backend environment

Create backend/.env and add:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string_with_database_name
- JWT_SECRET=your_long_random_secret

Important:
- Include a database name in MONGO_URI (example: /event-management)
- If DB name is missing, MongoDB defaults to test

## 3) Run backend

- cd backend
- npm run dev

## 4) Run frontend

In a second terminal:

- cd frontend
- npm run dev

Frontend default URL:
- http://localhost:5173

Backend default URL:
- http://localhost:5000
