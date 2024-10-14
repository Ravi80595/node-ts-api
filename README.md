# User Management API

A Node.js and Express application built with TypeScript, providing a user management system with authentication, role-based access control, and request logging features. The application allows users to register, log in, and view their profile, while providing admin users with the ability to manage other users.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
  - [User Module](#user-module)
  - [Admin Module](#admin-module)
- [Authentication & Authorization](#authentication--authorization)
- [Request Logging Middleware](#request-logging-middleware)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with email and password.
- User login with JWT authentication.
- View user profile (authenticated users).
- Admin functionalities:
  - Create, read, update, and delete users.
  - Role assignment for users.
  - Search and pagination for user management.
- Logging of requests to the server.

## Technologies

- Node.js
- Express
- TypeScript
- MongoDB
- JWT (JSON Web Token)
- bcrypt (for password hashing)

## API Endpoints

### User Module

- **POST** `/api/register`: 
  - Register a new user with name, email, and password.
  - Passwords are securely hashed.
  - Checks for unique email addresses.

- **POST** `/api/login`: 
  - Log in using email and password.
  - Returns a JWT token on successful authentication.

- **GET** `/api/profile`: 
  - View the authenticated user's profile (name, email, registration date).
  - Protected route with JWT authentication.

### Admin Module

- **POST** `/api/admin/users`: 
  - Create a new user (admin only).
  - Assign roles (user or admin).

- **GET** `/api/admin/users`: 
  - Get a paginated list of all registered users.
  - Supports search filters by name, email, and role.

- **PUT** `/api/admin/users/:id`: 
  - Update a user’s details (admin only).
  - Ensures email uniqueness after updates.

- **DELETE** `/api/admin/users/:id`: 
  - Delete a user (admin only).
  - Admins cannot delete themselves.

## Authentication & Authorization

- JWT-based authentication for securing protected routes.
- Role-Based Access Control (RBAC) to restrict access to admin routes.

## Request Logging Middleware

- Middleware to log each request to the server, including the endpoint, HTTP method, and timestamp.

## Getting Started

Follow the steps below to set up the application locally.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ravi80595/node-ts-api
   cd node-ts-api

2. Install Dependencies

   ```bash
   npm install

3. Create a .env file in the root directory to store environment variables, including database connection details and JWT secret.

### Usage

1. Start the server:

   ```bash
      npm run dev


2. The server will be running at http://localhost:3000.



