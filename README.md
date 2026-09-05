# Job Portal

Publish job opportunities and manage their hiring status.

## Technology

- React.js, HTML, CSS, JavaScript and Bootstrap
- Java 17 and Spring Boot
- MySQL

## Features

- MySQL-backed Sign Up, Login and Logout
- BCrypt password hashing and session authentication
- CSRF-protected create, update, delete and logout requests
- Protected REST APIs with validation and clear error responses
- Dashboard, Home, Records and Form pages
- Search plus complete Create, Read, Update and Delete operations
- Responsive desktop sidebar and mobile navigation

## Demo Login

`admin@demo.com` / `Admin@123`

Change `DEMO_ADMIN_PASSWORD` and disable `SEED_DEMO_DATA` outside local development.

## Run

Start MySQL, then open one PowerShell window:

```powershell
$env:MYSQL_PASSWORD="your-mysql-password"
cd "E:\Excelr Projects\job-portal\backend"
mvn spring-boot:run
```

Open a second PowerShell window:

```powershell
cd "E:\Excelr Projects\job-portal\frontend"
npm install
npm run dev
```

Open `http://localhost:5173`.

## Main APIs

- `GET /api/auth/csrf`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/jobs?search=`
- `GET /api/jobs/{id}`
- `POST /api/jobs`
- `PUT /api/jobs/{id}`
- `DELETE /api/jobs/{id}`
