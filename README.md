# Job Portal

A concise full-stack recruitment project built with React.js, Bootstrap, Java, Spring Boot, and MySQL.

## What is included

- React frontend with search, create, and status update flows
- Spring Boot REST API with list, create, update, and delete endpoints
- MySQL connection settings and schema
- Clean, minimal code arranged for easy extension

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

## Run backend

Create the database from `database/schema.sql`, then update the MySQL password in `backend/src/main/resources/application.properties`.

```bash
cd backend
mvn spring-boot:run
```

API base: `/api/job-portal/items`
