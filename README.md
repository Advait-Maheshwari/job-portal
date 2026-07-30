# Job Portal

A clean full-stack recruitment project using React.js, Bootstrap, Java, Spring Boot, and MySQL.

## Zero-cost design

This project does not use paid APIs or paid cloud services. It runs locally with open-source/free tools only: React.js, Bootstrap, Java, Spring Boot, and MySQL Community Edition.

## Project Structure

```text
job-portal/
  frontend/                 React.js + Bootstrap UI
    src/
      api.js                API helper functions
      App.jsx               Main dashboard screen
      main.jsx              React entry point
      styles.css            App styling
  backend/                  Spring Boot REST API
    src/main/java/com/excelr/jobportal/
      config/               Startup seed data
      controller/           REST endpoints
      model/                JPA entity
      repository/           Database access
      service/              Business logic
  database/schema.sql       MySQL schema
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Run Backend

Create the database from `database/schema.sql`, then update the MySQL password in `backend/src/main/resources/application.properties`.

```bash
cd backend
mvn spring-boot:run
```

API: `/api/job-portal/items`
