# Task Management Application

A full-stack task management web application that allows users to authenticate using Google OAuth, create and assign tasks to other users, and receive email notifications when tasks are assigned or completed.

## Live Demo

Frontend: https://task-management-app-zeta-smoky.vercel.app/

Backend: https://task-management-app-production-f349.up.railway.app/


## Features

### Authentication
- Secure Google OAuth 2.0 Login
- User session management using Supabase Authentication

### Task Management
- Create new tasks
- View assigned and created tasks
- Assign tasks to other registered users
- Update task status
- Mark tasks as completed
- Delete tasks

### Email Notifications
- Email notification when a task is assigned
- Email notification when a task is completed
- Resend integration

### Dashboard
- Total Tasks count
- Pending Tasks count
- Completed Tasks count
- Task overview table


## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Flask
- Flask-CORS
- Python

### Database & Authentication
- Supabase
- Google OAuth 2.0

### Email Service
- Resend

### Deployment
- Vercel (Frontend)
- Railway (Backend)
- Supabase (Database)


## System Architecture

```text
+----------------------+
|      Frontend        |
| Next.js + TypeScript |
+----------+-----------+
           |
           |
           v
+----------------------+
|     Flask API        |
|      Backend         |
+----------+-----------+
           |
           |
           v
+----------------------+
|      Supabase        |
|      Database        |
+----------------------+

Google OAuth
      |
      v
Authentication

Resend
      |
      v
Email Notifications
```

---

## Database Schema

### Users Table

| Column | Type |
|----------|----------|
| id | UUID |
| email | TEXT |
| name | TEXT |
| created_at | TIMESTAMP |

### Tasks Table

| Column | Type |
|----------|----------|
| id | UUID |
| title | TEXT |
| description | TEXT |
| status | TEXT |
| assigned_to | UUID |
| created_by | UUID |
| created_at | TIMESTAMP |

---

## API Endpoints

### Authentication

Google OAuth handled through Supabase Authentication.


### Tasks

#### Create Task

```http
POST /tasks
```

#### Get All Tasks

```http
GET /tasks
```

#### Update Task Status

```http
PUT /tasks/<task_id>
```

#### Delete Task

```http
DELETE /tasks/<task_id>
```


## Project Structure

```text
task-management-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   └── requirements.txt
│
├── database/
│   └── migrations.sql
│
├── .env.example
├── README.md
└── .gitignore
```


## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```


## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

Backend will run at:

```text
http://localhost:5000
```


## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```


## Environment Variables

### Backend (.env)

```env
SUPABASE_URL=
SUPABASE_KEY=
EMAIL_USER=
EMAIL_PASSWORD=
```


### Frontend (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```


## Email Workflow

### Task Assignment

When a task is assigned:

1. User creates a task
2. Task is stored in Supabase
3. Assigned user receives email notification

### Task Completion

When a task is marked completed:

1. Status is updated in database
2. Completion email is triggered
3. Assigned user receives notification

Email notifications are implemented using Resend.

For testing, Resend's free-tier restriction allows sending only to the verified email address until a custom domain is verified.
