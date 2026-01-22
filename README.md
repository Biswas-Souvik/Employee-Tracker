# Query API – AWS SAM Local with PostgreSQL (Docker)

A serverless API built using **AWS SAM**, **Lambda**, and **API Gateway**, running **locally** with **PostgreSQL in Docker**.
The API queries the database based on **query parameters**.

---

## Table of Contents

- [Overview](#overview)
- [What is AWS SAM Local?](#what-is-aws-sam-local)
- [Why Use SAM Local?](#why-use-sam-local)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [PostgreSQL Setup (Docker)](#postgresql-setup-docker)
- [Environment Variables](#environment-variables)
- [ Verify SAM Template](#verify-sam-template)
- [Lambda Handler Logic](#lambda-handler-logic)
- [Database Connection](#database-connection)
- [Local Setup – Step by Step](#local-setup--step-by-step)
- [Running the Project Locally](#running-the-project-locally)
- [API Usage & Query Params](#api-usage--query-params)
- [Common Commands](#common-commands)
- [Troubleshooting](#troubleshooting)
- [Notes for New Developers](#notes-for-new-developers)

---

## Overview

This project demonstrates how to:

- Run AWS Lambda locally using **AWS SAM**
- Connect Lambda to **PostgreSQL running in Docker**
- Query the database using **HTTP query parameters**
- Test everything locally without deploying to AWS

---

## What is AWS SAM Local?

**AWS SAM Local** lets you simulate AWS Lambda and API Gateway **on your local machine** using Docker.

In simple terms:

- Lambda normally runs in AWS
- SAM Local runs it **locally**
- API Gateway endpoints are exposed on `localhost`

---

## Why Use SAM Local?

- Faster development (no cloud deployment needed)
- No AWS cost during development
- Easy debugging
- Same behavior as AWS Lambda

---

## Tech Stack

- **Node.js 24**
- **AWS SAM**
- **PostgreSQL**
- **Docker**
- **Drizzle ORM**
- **TypeScript**
- **esbuild**
- **git**

---

## Project Architecture

```
Client (Browser / Postman)
        |
        v
Local API Gateway (SAM)
        |
        v
Lambda Function (Node.js)
        |
        v
PostgreSQL (Docker)
```

---

## Prerequisites

Make sure you have these installed:

### 1. Node.js

```bash
node --version
```

### 2. Docker

Docker is required for:

- PostgreSQL container
- Lambda runtime simulation

```bash
docker --version
```

Ensure Docker Desktop is running.

---

### 3. AWS SAM CLI

```bash
sam --version
```

Install guide:
[https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

### 4. Git

```bash
git --version
```

---

## Project Structure

```
.
├── src/
│   ├── index.ts            # Lambda handler
│   └── utils/
│       └── db.utils.ts     # DB query functions
├── template.yaml           # SAM template
├── env.json                # Local environment variables
├── package.json
├── tsconfig.json
└── README.md
```

---

## PostgreSQL Setup (Docker)

### Example Docker Command

```bash
docker run --name postgres-local \
  -e POSTGRES_USER=<username> \
  -e POSTGRES_PASSWORD=<password> \
  -e POSTGRES_DB=<DB name> \
  -p <port> \
  -d postgres
```

### Verify PostgreSQL is Running

```bash
docker ps
```

---

## Environment Variables

### env.json (Required)

Create a file called **env.json** in the root of the project:

```json
{
  "QueryFunction": {
    "DATABASE_URL": "postgresql://<username>:<password>@host.docker.internal:<port>/<DB name>"
  }
}
```

### Why `host.docker.internal`?

- SAM runs Lambda inside Docker
- PostgreSQL runs on your host
- `localhost` inside Docker ≠ your machine
- `host.docker.internal` allows Docker → Host communication

---

## Verify SAM Template

    Environment:
        Variables:
          DATABASE_URL: ''

The environment variable is injected locally using `env.json`.

---

## Lambda Handler Logic

```ts
const { q } = event?.queryStringParameters ?? {};
```

The API behavior depends on the query parameter `q`.

### Supported Queries

| Query Param (`q`)   | Description             |
| ------------------- | ----------------------- |
| `employees`         | List all employees      |
| `employeesProjects` | Employees with projects |
| `projects`          | List projects           |
| `employeesActive`   | Active Employees        |
| `projectsActive`    | Active Projects         |
| `employeesBench`    | Employees on bench      |

---

## Database Connection

- Uses `pg` connection pool
- Drizzle ORM wraps the pool
- Connection string comes from `env.json`

---

## Local Setup – Step by Step

### 1. Clone the Repository

```bash
git clone https://github.com/Biswas-Souvik/Employee-Tracker.git
cd Employee-Tracker
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start PostgreSQL (Docker)

```bash
docker start postgres-local
```

---

### 4. Validate SAM Template

```bash
sam validate
```

---

### 5. Build the Project

```bash
sam build
```

---

## Running the Project Locally

```bash
sam local start-api --env-vars env.json
```

Expected output:

```
Mounting GET /data at http://127.0.0.1:3000/data
```

---

## API Usage & Query Params

### Example Requests

```bash
curl "http://localhost:3000/data?q=employees"
```

```bash
curl "http://localhost:3000/data?q=projects"
```

### Browser Example

```
http://localhost:3000/data?q=employeesBench
```

---

## Common Commands

| Command               | Purpose                  |
| --------------------- | ------------------------ |
| `sam validate`        | Validate template        |
| `sam build`           | Build Lambda             |
| `sam local start-api` | Run API locally          |
| `sam local invoke`    | Invoke Lambda directly   |
| `docker ps`           | Check running containers |

---

## Troubleshooting

### Database Connection Fails

- Ensure Docker is running
- Verify port
- Confirm `env.json` is passed

```bash
sam local start-api --env-vars env.json
```

---

### `ECONNREFUSED`

- PostgreSQL container not running
- Wrong port or credentials

---

### `DATABASE_URL` is undefined

- `env.json` missing
- Wrong function name in `env.json`

Must match:

```json
"QueryFunction"
```

---

## Notes for New Developers

- SAM Local **does not create AWS resources**
- PostgreSQL must be running before Lambda
- Query parameters control Lambda behavior
- Always test locally before deploying

---
