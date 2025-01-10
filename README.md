# URL Shortener API

## Description
A URL shortening service built with NestJS and VueJS. This project provides a REST API for creating, managing, and analyzing shortened URLs, along with a simple frontend for testing.

## Features
1. Create short URLs with optional custom aliases.
2. Redirect to the original URL using the shortened link.
3. Retrieve information about a shortened link, including click statistics.
4. Delete shortened links.
5. Analytics for link transitions.
6. Link expiration support.

## Technologies Used
- **Backend:** NestJS, TypeORM, PostgreSQL
- **Frontend:** VueJS
- **Database:** PostgreSQL
- **Testing:** Jest, Supertest
- **Containerization:** Docker, Docker Compose

## Installation

### Prerequisites
- Node.js (23 or later)
- Docker and Docker Compose

### Backend Setup
1. Clone the repository.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   NODE_ENV=development
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=
   DATABASE_NAME=url_shortener
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### With Docker
1. Navigate to the root directory.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```

### Without Docker
1. Start the PostgreSQL database locally.
2. Run the backend:
   ```bash
   cd backend
   npm run start
   ```
3. Run the frontend:
   ```bash
   cd frontend
   npm run serve
   ```

## Testing

### Backend Tests
Run the following command in the `backend` directory:
```bash
npm run test
```

### Features to Test
1. Creating a link with a unique alias.
2. Redirecting to the original URL.

## Usage
1. Open the frontend in your browser (default: `http://localhost:3000`).
2. Enter a URL in the form and generate a short link.
3. Use the short link to test redirection.

## License
This project is licensed under the MIT License.
