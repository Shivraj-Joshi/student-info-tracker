# Student Info Tracker

A full-stack, role-based academic management system where students can view their academic progress and teachers/admins manage the data behind it. Built to model how a real school's internal system would work — Admins manage teachers, students, and subjects; Teachers manage attendance and grades for their own subject; Students view their own academic record.

**Live demo:** https://student-info-tracker.vercel.app/

> Use the **Quick Demo Access** buttons on the login page to instantly try any of the three roles — no signup required.

---

## Why this project

Most student-tracker portfolio projects are single-user CRUD apps. This one models a real organizational hierarchy with three distinct roles, each with different permissions, and enforces those permissions at the database query level — not just hidden UI buttons. A teacher cannot record a grade for a subject they don't teach. A student cannot see grades for a subject they aren't enrolled in. These rules are enforced on the backend, regardless of what the frontend sends.

---

## Features

**Admin**
- Add, view, and remove teachers
- Add, view, and remove subjects
- Add, view, and remove students
- Enroll students into subjects

**Teacher**
- Mark attendance for their assigned subject only
- Record and update grades for their assigned subject only
- View the list of students enrolled in their subject

**Student**
- View enrolled subjects
- View their own attendance history
- View their own grades — limited strictly to subjects they're enrolled in

**Cross-cutting**
- JWT-based authentication, scoped per role
- Role-based route protection on both backend (middleware) and frontend (protected routes)
- Rate limiting on auth endpoints to prevent brute-force attempts
- Request validation with Zod on registration and login
- Subject-ownership checks so a teacher can only act on their own subject's data

---

## Tech stack

**Backend**
- Node.js + Express
- PostgreSQL with Prisma ORM
- JWT for authentication, bcrypt for password hashing
- Zod for request validation
- Helmet + express-rate-limit for hardening

**Frontend**
- React + Vite
- Tailwind CSS
- React Router (with protected, role-based routes)
- Context API for auth state

**Infrastructure**
- Database hosted on Neon (serverless PostgreSQL)
- Backend deployed on Render
- Frontend deployed on Vercel

---

## Architecture

The backend follows a layered architecture:

```
Routes  →  Controllers  →  Services  →  Prisma  →  PostgreSQL
```

- **Routes** define the endpoint and attach auth/role/validation middleware
- **Controllers** handle the HTTP layer — parsing requests, sending responses
- **Services** contain the actual business logic and database queries
- **Middleware** handles authentication, role authorization, and input validation centrally

This separation keeps each layer testable and means business rules (like "a teacher can only grade their own subject") live in one place — the service layer — rather than scattered across routes.

### Data model

```
Admin ──manages──> Teacher ──teaches──> Subject
Student ──enrolls in──> Subject (via Enrollment)
Student + Subject + Teacher ──> Attendance
Student + Subject + Teacher ──> Grade
```

Full schema lives in `backend/prisma/schema.prisma`.

---

## Demo credentials

| Role    | Email               | Password    |
|---------|---------------------|-------------|
| Admin   | admin@school.com    | admin123    |
| Teacher | john@school.com     | teacher123  |
| Student | john@student.com    | student123  |

These are also available as one-click buttons on the login page.

---

## Running it locally

### Prerequisites
- Node.js (v20+)
- PostgreSQL database (local or a free Neon project)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET_KEY="your-secret-key"
ADMIN_EMAIL="admin@school.com"
ADMIN_PASSWORD="admin123"
PORT=3000
```

Set up the database:

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

---

## API overview

All protected routes require a `Authorization: Bearer <token>` header.

| Method | Endpoint                          | Access          | Description                     |
|--------|------------------------------------|-----------------|----------------------------------|
| POST   | `/api/admin/login`                | Public          | Admin login                     |
| POST   | `/api/teacher/login`              | Public          | Teacher login                   |
| POST   | `/api/teacher/register`           | Admin           | Add a new teacher               |
| GET    | `/api/teacher`                    | Admin           | List all teachers               |
| DELETE | `/api/teacher/:id`                | Admin           | Remove a teacher                |
| POST   | `/api/student/register`           | Public / Admin  | Register a student              |
| POST   | `/api/student/login`              | Public          | Student login                   |
| GET    | `/api/student`                    | Admin           | List all students               |
| DELETE | `/api/student/:id`                | Admin           | Remove a student                |
| POST   | `/api/subject`                    | Admin           | Add a subject                   |
| GET    | `/api/subject`                    | Admin           | List all subjects               |
| DELETE | `/api/subject/:id`                | Admin           | Remove a subject                |
| POST   | `/api/enrollment`                 | Admin           | Enroll a student in a subject   |
| GET    | `/api/enrollment/student`         | Student         | View own enrolled subjects      |
| GET    | `/api/enrollment/subject/:id`     | Teacher/Admin    | View students in a subject      |
| POST   | `/api/attendance`                 | Teacher         | Mark attendance (own subject)   |
| GET    | `/api/attendance/student`         | Student         | View own attendance             |
| GET    | `/api/attendance/subject/:id`     | Teacher/Admin    | View attendance for a subject   |
| POST   | `/api/grade`                      | Teacher         | Record/update grade (own subject)|
| GET    | `/api/grade/student`              | Student         | View own grades (enrolled only) |
| GET    | `/api/grade/subject/:id`          | Teacher/Admin    | View grades for a subject       |

---

## What I'd add next

- Pagination on list endpoints as data scales
- Full Zod validation coverage across enrollment, attendance, and grade routes
- Email notifications when a grade or attendance record is updated
- Class-wide analytics dashboard for admins (attendance rate, average grades)

---

## Author

Built by Shivraj Joshi as a self-directed full-stack learning project — from schema design through deployment.
