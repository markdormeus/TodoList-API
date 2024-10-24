# Todo List API

A simple Todo List application built using Go for the backend and React for the frontend. This project allows users to manage tasks with CRUD operations.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Components](#components)
- [API Endpoints](#api-endpoints)

## Technologies Used
- **Frontend**: React, TypeScript
- **Backend**: Go (Gin framework), MySQL
- **Database**: MySQL
- **Package Management**: npm, Go modules

## Installation

### Frontend
1. Ensure you have Node.js installed on your machine. You can download and install it from [nodejs.org](https://nodejs.org).
2. Creating the react Project:
  - After installing Node.js, navigate to the main project directory:
   ```bash
    cd todolist-api/
   ```
- Create a new React project using Create React App:
  ```bash
    npx create-react-app frontend --template typescript
  ```
- Navigate to the newly created frontend directory:
  ```bash
    cd frontend
3. Installing Required Packages:
- Install the required Node.js packages:
  ```bash
    npm install
4. To avoid CORS issues, add a proxy to your package.json file:
   ```bash
    "proxy": "http://localhost:8080"
5. Build the frontend:
   ```bash
    npm run build
6. To avoid CORS issues, add a proxy to your package.json file:
   ```bash
    "proxy": "http://localhost:8080"
7. Now you should be good to run the static node files using Go!
   

### Backend
1. Ensure you have Go installed on your machine. You can download it from [go.dev](https://go.dev/doc/install).
2. Clone the repository:
   ```bash
    git clone https://github.com/markdormeus/TodoList-API
    cd todolist-api/backend
3. Set up your MySQL database:
  - Create a database named todolist
  - Run the SQL commands in create-tables.sql to create the necessary tables.
4. Set environment variables for your database connection in your terminal:
  For Mac:
    ```bash
    export DBUSER=<your-db-username>
    export DBPASS=<your-db-password>
    ```
  For Windows:
  - Using Command Prompt:
    ```bash
    set DBUSER=<your-db-username>
    set DBPASS=<your-db-password>
    ```
  - Using PowerShell:
    ```bash
    $env:DBUSER="<your-db-username>"
    $env:DBPASS="<your-db-password>"
    ```
5. Install dependencies and run the backend:
   ```bash
    go get .
    go mod tidy
    go run .

## Installation

Follow these steps to set up and run the Todo List application on your local machine.

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/markdormeus/TodoList-API
```
## Usage
- Access the application by navigating to http://localhost:8080 in your web browser.
- Use the "Create Task" button to add new tasks and view existing tasks on the tasks page

## Components
- GetTasks: Fetches and displays tasks from the backend.
- CreateTask: Provides a form to create new tasks.

## API Endpoints
- GET /tasks: Retrieve all tasks.
- POST /tasks: Create a new task.

