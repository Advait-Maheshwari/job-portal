# Job Portal

A student-friendly full-stack recruitment project built with React.js, Bootstrap, Java, Spring Boot, and MySQL.

## Technology Used

- React.js, HTML, CSS, JavaScript, Bootstrap
- Java and Spring Boot
- MySQL

## Zero-cost Design

This project runs locally with free tools only. It does not use paid APIs, paid databases, cloud services, Firebase, MongoDB, Tailwind, Express, or Next.js.

## Project Structure

```text
job-portal/
  frontend/
    src/
      api.js
      App.jsx
      main.jsx
      styles.css
  backend/
    src/main/java/com/excelr/jobportal/
      config/
      controller/
      model/
      repository/
      service/
  database/
    schema.sql
```

## Features

- Add jobs
- View saved records
- Search records
- Edit details
- Change status
- Delete records
- Basic form validation and API error messages

## Run Backend

Set your MySQL password once:

```powershell
$env:MYSQL_PASSWORD="your-mysql-password"
```

Then run:

```powershell
cd "E:\Excelr Projects\job-portal\backend"
"E:\Excelr Projects\tools\apache-maven-3.9.16\bin\mvn.cmd" spring-boot:run
```

## Run Frontend

```powershell
cd "E:\Excelr Projects\job-portal\frontend"
npm install
npm run dev
```

## API Endpoints

- `GET /api/job-portal/items`
- `POST /api/job-portal/items`
- `PUT /api/job-portal/items/{id}`
- `DELETE /api/job-portal/items/{id}`
