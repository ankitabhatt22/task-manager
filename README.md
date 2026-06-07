# Personal Task Manager

A full-stack task management application built using React and Node.js. Users can create, update, delete, search, and manage tasks with due dates, completion tracking, filtering, and persistent storage.

## Features

* Create new tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as complete/incomplete
* Filter tasks by:

  * All
  * Active
  * Completed
* Search tasks by title
* Due date support
* Overdue task highlighting
* Active and completed task statistics
* Empty state handling
* JSON file persistence

## Tech Stack

### Frontend

* React
* Axios
* Vite

### Backend

* Node.js
* Express.js

### Storage

* JSON File (`tasks.json`)

## Project Structure

task-manager/

├── client/

│   ├── src/

│   │   ├── components/

│   │   ├── services/

│   │   └── App.jsx

│   └── package.json

│

├── server/

│   ├── data/

│   │   └── tasks.json

│   ├── routes/

│   │   └── taskRoutes.js

│   └── server.js

│

└── README.md

## Installation

### Clone Repository

git clone <repository-url>

cd task-manager

### Backend Setup

cd server

npm install

npm run dev

### Frontend Setup

cd client

npm install

npm run dev

## API Documentation

### Get All Tasks

GET /api/tasks

### Create Task

POST /api/tasks

Request Body:

{
"title": "Learn React",
"description": "Study hooks",
"dueDate": "2026-06-10"
}

### Update Task

PUT /api/tasks/:id

### Toggle Task Status

PATCH /api/tasks/:id/toggle

### Delete Task

DELETE /api/tasks/:id

## Future Improvements

* User authentication
* Drag and drop task ordering
* SQLite or MongoDB database
* Dark/Light theme toggle
* Cloud synchronization

## Author

Ankita Bhatt
