# URL Shortener

This is a simple URL shortener application with a Go backend and a React frontend.

## Backend

The backend is a Go application using the Gin framework.

### Running the backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    go mod tidy
    ```
3.  Run the application:
    ```bash
    go run main.go
    ```

The backend will be running at `http://localhost:8080`.

## Frontend

The frontend is a React application built with Vite.

### Running the frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` directory with the following content:
    ```
    VITE_API_URL=http://localhost:8080
    VITE_BASE_URL=localhost:8080
    ```
4.  Run the application:
    ```bash
    npm run dev
    ```

The frontend will be running at `http://localhost:5173`.
