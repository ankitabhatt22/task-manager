# 🚀 Task Manager Pro

A modern and user-friendly Task Management application built using **React, Node.js, Express, and JSON-based data storage**.

Task Manager Pro helps users stay organized by allowing them to create, update, track, and manage their daily tasks through a clean and responsive interface. Whether you're managing personal goals, study schedules, or work assignments, this application provides a simple and efficient way to keep everything under control.

---

# 📖 About the Project

Managing tasks is an important part of productivity, but many people struggle with keeping track of deadlines and pending work. Task Manager Pro was developed to solve this problem by providing a centralized platform where users can create tasks, monitor their progress, and stay aware of upcoming deadlines.

The application follows a full-stack architecture where the frontend handles user interactions and the backend manages task processing and data persistence.

The project is built using:

* **React** for creating an interactive user interface
* **Node.js** and **Express.js** for backend development
* **Axios** for API communication
* **React Toastify** for notifications
* **JSON File Storage** for data persistence

---

# ✨ Key Features

## 📝 Task Creation and Management

Users can easily create tasks by providing:

* Task title
* Description
* Due date

Each task is stored and displayed instantly within the dashboard.

### Additional Task Operations

Users can:

* Edit existing tasks
* Delete unwanted tasks
* Mark tasks as completed
* Reopen completed tasks whenever necessary

This provides complete control over task management.

---

## 🔍 Search and Filtering

As the number of tasks grows, finding specific tasks becomes important.

Task Manager Pro includes:

### Search Functionality

Users can search tasks instantly by typing keywords related to the task title.

### Smart Filters

Tasks can be filtered into:

* All Tasks
* Active Tasks
* Completed Tasks

This allows users to focus only on relevant tasks.

---

## 📅 Due Date Tracking

Each task can have an associated deadline.

The application helps users by:

* Displaying due dates clearly
* Identifying overdue tasks
* Highlighting deadlines visually

This feature ensures important tasks are not forgotten.

---

## 📊 Dashboard Statistics

The dashboard provides quick insights into task progress.

Users can instantly see:

* Total Active Tasks
* Total Completed Tasks

These statistics help monitor productivity at a glance.

---

## 🔔 Better User Experience

To improve usability, several user-friendly features have been included:

### Toast Notifications

Notifications appear whenever a task is:

* Created
* Updated
* Completed
* Deleted

### Delete Confirmation

Before deleting a task, users are asked for confirmation to prevent accidental data loss.

### Loading States

The application displays loading indicators while data is being fetched from the server.

### Responsive Design

The interface works smoothly across:

* Desktop Computers
* Tablets
* Mobile Devices

---

## 💾 Persistent Storage

Unlike temporary applications where data disappears after restarting the server, Task Manager Pro stores all task data inside a JSON file.

This means:

* Tasks remain saved after server restarts
* No database installation is required
* Data management remains simple and lightweight

---

# 🏗️ Project Structure

## Frontend

```text
client/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── TaskForm.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

### Frontend Responsibilities

The frontend is responsible for:

* Displaying tasks
* Handling user input
* Managing filters and search
* Communicating with backend APIs
* Providing visual feedback

---

## Backend

```text
server/
│
├── data/
│   └── tasks.json
│
├── routes/
│   └── taskRoutes.js
│
├── server.js
└── package.json
```

### Backend Responsibilities

The backend handles:

* Processing API requests
* Managing task operations
* Reading and writing task data
* Updating JSON storage

---

# ⚙️ Technologies Used

## Frontend Technologies

### React

React is used to build reusable UI components and manage application state efficiently.

### Vite

Vite provides an extremely fast development environment and optimized production builds.

### Axios

Axios is used for sending HTTP requests between the frontend and backend.

### React Icons

Provides visually appealing icons that improve the overall interface.

### React Toastify

Used to display notification messages whenever user actions are performed.

---

## Backend Technologies

### Node.js

Provides the runtime environment for executing backend JavaScript code.

### Express.js

Express simplifies API creation and request handling.

### File System Module (fs)

The Node.js File System module is used to read and write task data to the JSON file.

---

# 🔌 REST API Endpoints

The application exposes several RESTful endpoints.

## Get All Tasks

```http
GET /api/tasks
```

Returns all available tasks.

---

## Create a New Task

```http
POST /api/tasks
```

Example Request:

```json
{
  "title": "Learn React",
  "description": "Study React Hooks",
  "dueDate": "2026-06-10"
}
```

Creates a new task and stores it in the JSON file.

---

## Update a Task

```http
PUT /api/tasks/:id
```

Allows modification of existing task details.

---

## Toggle Task Status

```http
PATCH /api/tasks/:id/toggle
```

Switches task status between:

* Active
* Completed

---

## Delete a Task

```http
DELETE /api/tasks/:id
```

Permanently removes a task from storage.

---

# 💾 How Data Persistence Works

All tasks are stored inside:

```text
server/data/tasks.json
```

Whenever a user performs an operation such as:

* Creating a task
* Editing a task
* Completing a task
* Deleting a task

the backend automatically updates the JSON file.

As a result, all changes remain saved even after restarting the application.

---

# 🎨 User Interface Design

The application follows a modern dashboard-style design.

### Dashboard Features

* Dark Theme Interface
* Responsive Layout
* Smooth Hover Effects
* Clean Card-Based Design
* Easy Navigation

### Task Cards

Each task card displays:

* Task Title
* Description
* Due Date
* Creation Date
* Current Status

### Status Indicators

| Status    | Indicator    |
| --------- | ------------ |
| Active    | 🟢 Active    |
| Completed | 🔵 Completed |
| Overdue   | 🔴 Overdue   |

These visual indicators help users quickly identify task conditions.

---

# 🔄 Application Workflow

## Step 1: Creating a Task

The user fills out the task form.

↓

The frontend sends a request:

```http
POST /api/tasks
```

↓

The backend creates the task.

↓

The task is stored inside `tasks.json`.

↓

The updated task list is returned to the frontend.

↓

The UI updates automatically.

---

## Step 2: Completing a Task

The user clicks the Complete button.

↓

Frontend sends:

```http
PATCH /api/tasks/:id/toggle
```

↓

Backend updates task status.

↓

JSON file is updated.

↓

Frontend refreshes the task list.

---

## Step 3: Searching Tasks

The user enters text into the search bar.

↓

React filters tasks directly in memory.

↓

Matching tasks are displayed instantly.

No additional API requests are required.

---

# 🚀 Installation and Setup

## Clone the Repository

```bash
git clone <repository-url>
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🌐 Deployment

The project can be deployed using modern cloud platforms.

### Frontend Deployment

Recommended:

* Vercel

### Backend Deployment

Recommended:

* Render

These services provide simple deployment workflows and free hosting options for small projects.

---

# 🔮 Future Improvements

Several enhancements can be added in future versions:

* User Authentication & Authorization
* JWT-Based Security
* MongoDB Database Integration
* Drag and Drop Task Management
* Task Categories
* Priority Levels
* Dark/Light Theme Switching
* User Profiles
* Cloud-Based Data Storage
* Real-Time Synchronization

---

# 🎯 Learning Outcomes

This project demonstrates practical implementation of several important web development concepts:

* React Hooks
* Component-Based Development
* State Management
* RESTful API Design
* CRUD Operations
* Express Routing
* Backend Development
* JSON-Based Persistence
* API Integration Using Axios
* Responsive UI Design
* Full-Stack Application Development

---

# 👨‍💻 Author

**Ankita Bhatt**

Task Manager Pro was developed as a Full Stack Web Application project to demonstrate frontend-backend integration, task management functionality, REST API development, and persistent data handling using React, Node.js, and Express.

The project reflects modern web development practices and serves as a strong foundation for building larger productivity and project management systems in the future.
