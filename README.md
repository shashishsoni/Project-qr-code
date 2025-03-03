# QR Code Generator API

## Overview
The QR Code Generator API is a RESTful API built with Node.js and Express that allows users to register, log in, and reset their passwords. This API serves as the backend for a QR Code Generator application, providing essential user management functionalities.

## Table of Contents
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
  - [User Registration](#1-user-registration)
  - [User Login](#2-user-login)
  - [Reset Password](#3-reset-password)
  - [Update Password](#4-update-password)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Nodemailer**: Module for sending emails.
- **JSON Web Tokens (JWT)**: For secure user authentication.
- **Bcrypt**: Library for hashing passwords.
- **Axios**: Promise-based HTTP client for the frontend.

## File Structure

    /project-root
    │
    ├── /backend
    │ ├── /controller
    │ │ └── authController.ts # Contains authentication logic
    │ ├── /model
    │ │ ├── signupmodel.ts # User model for registration
    │ │ └── userreset.ts # User model for password reset
    │ ├── /routes
    │ │ └── authRoutes.ts # API routes for authentication
    │ ├── /utils
    │ │ ├── emailService.ts # Email sending logic
    │ │ └── utils.ts # Utility functions (hashing, etc.)
    │ ├── app.ts # Main application file
    │ └── server.ts # Server setup and configuration
    │
    └── /frontend
    ├── /app
    │ ├── /reset-password
    │ │ └── page.tsx # Reset password page component
    │ └── /signup
    │ └── page.tsx # Signup page component
    └── utils
    └── api.ts # API utility functions for making requests


## Docker Installation and Usage

This project can be easily set up and run using Docker and Docker Compose. Follow the steps below to get started.

### Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/shashishsoni/qr-code-generator-api.git
cd qr-code-generator-api
```

### Step 2: Configure Environment Variables

Before running the application, you need to set up the environment variables. Create a `.env` file in the root of your project directory and add the following variables:

```plaintext
JWT_SECRET=your_jwt_secret
SMTP_SERVER=your_smtp_server
SMTP_PORT=your_smtp_port
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
FRONTEND_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

Make sure to replace the placeholder values with your actual configuration.

### Step 3: Build and Run the Application

To build and run both the backend and frontend services, use the following command:

```bash
docker-compose up --build
```

This command will:

- Build the Docker images for both the backend and frontend services.
- Start the containers and map the necessary ports.

### Step 4: Access the Application

Once the containers are running, you can access the application at the following URLs:

- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Frontend Application**: [http://localhost:3000](http://localhost:3000)

### Step 5: Stopping the Application

To stop the running containers, you can use:

```bash
docker-compose down
```

This command will stop and remove the containers, but your data will persist if you are using a remote MongoDB instance.

### Additional Notes

- If you encounter any issues during the build process, ensure that your Dockerfile and docker-compose.yml files are correctly configured.
- For development purposes, you can modify the code in the `backend` and `frontend` directories, and the changes will be reflected in the running containers due to the volume mounts specified in the `docker-compose.yml` file.

### Conclusion

Using Docker and Docker Compose simplifies the setup and deployment of the QR Code Generator application. If you have any questions or issues, feel free to open an issue in the repository.


## API Endpoints

### 1. User Registration
- **Endpoint**: `POST /api/auth/signup`
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "message": "User registered successfully"
        }
        ```
    - **Error**:
        ```json
        {
            "message": "Error message"
        }
        ```

### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "message": "Login successful",
            "token": "JWT_TOKEN"
        }
        ```
    - **Error**:
        ```json
        {
            "message": "Invalid email or password"
        }
        ```

### 3. Reset Password
- **Endpoint**: `POST /api/auth/reset-password`
- **Request Body**:
    ```json
    {
        "email": "string"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Password reset instructions sent to your email"
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "No account found with this email address"
        }
        ```

### 4. Update Password
- **Endpoint**: `POST /api/auth/update-password`
- **Request Body**:
    ```json
    {
        "token": "string",
        "newPassword": "string"
    }
    ```
- **Response**:
    - **Success**:
        ```json
        {
            "success": true,
            "message": "Password has been reset successfully",
            "token": "JWT_TOKEN"
        }
        ```
    - **Error**:
        ```json
        {
            "success": false,
            "message": "Invalid or expired reset token"
        }
        ```

## Environment Variables
Make sure to set the following environment variables in your deployment environment:
- `JWT_SECRET`: Secret key for JWT signing.
- `SMTP_SERVER`: SMTP server for sending emails.
- `SMTP_PORT`: Port for the SMTP server.
- `SMTP_USERNAME`: Username for the SMTP server.
- `SMTP_PASSWORD`: Password for the SMTP server.
- `FRONTEND_URL`: URL of the frontend application.

## Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/shashishsoni/qr-code-generator-api.git
   cd qr-code-generator-api
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Set up your environment variables in a `.env` file or directly in your deployment environment.
4. Start the server:
   ```bash
   npm start
   ```

## Testing
You can test the API endpoints using tools like Postman or curl. Make sure to replace the base URL with your deployed API URL.

### Example Test with Postman
- **Reset Password**:
  - Method: `POST`
  - URL: `https://your-api-url/api/auth/reset-password`
  - Body:
    ```json
    {
        "email": "user@example.com"
    }
    ```
