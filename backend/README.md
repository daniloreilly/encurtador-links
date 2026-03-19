# Backend

This is the backend for the URL shortener application. It's built with Go and the Gin framework.

## Running the application

1.  Install the dependencies:
    ```bash
    go mod tidy
    ```
2.  Run the application:
    ```bash
    go run main.go
    ```

The backend will be running at `http://localhost:8080`.

## Endpoints

- `POST /shorten`: Creates a new shortened URL.
  - Body:
    ```json
    {
      "url": "https://example.com"
    }
    ```
- `GET /{code}`: Redirects to the original URL.
