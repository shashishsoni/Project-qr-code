
# Hiring Test for Full Stack Developer Intern

**NOTE:** You can use React or Next.js for the frontend and Node.js (or PHP) for the backend. Incorporating caching (e.g., Redis) is a plus. Deploy your project on any platform of your choice. Please provide both the live application URL and a link to your GitHub repository (which must be publicly accessible).

---

## Objective

The objective of this test is to evaluate your ability to:
- Build a full stack web application featuring user authentication (login, signup, and password reset).
- Develop a QR Code Generator web app that lets users generate QR codes with customizable design options.
- Implement a clean, modular, and well-documented codebase following industry best practices.
- Demonstrate familiarity with version control (Git) using clear, atomic commit messages.
- Optionally integrate caching to improve performance.

---

## Task Requirements

### 1. User Authentication
- **Signup:** Allow users to create an account.
- **Login:** Implement user login functionality.
- **Password Reset:** Provide a mechanism for users to reset their password if forgotten.
- **Security:** Secure all API endpoints using JWT, sessions, or another method of your choice.

### 2. QR Code Generator
- **Core Functionality:** Enable users to generate QR codes based on input data (e.g., URL or text).
- **Customization:** Allow users to customize the QR code appearance (border style, color, etc.). You may use libraries such as `qrcode.react` or `qr-code-styling`.
- **User Experience:** Ensure the interface is responsive and user-friendly.

### 3. Tech Stack Guidelines
- **Frontend:** Use React or Next.js.
- **Backend:** Use Node.js (or PHP) to create RESTful APIs.
- **Database:** Choose any database (e.g., MongoDB, PostgreSQL, MySQL) for storing user information and (optionally) QR code generation history.
- **Authentication:** Utilize JWT or session-based authentication.
- **QR Code Generation:** Integrate a suitable QR code generation library.
- **Caching (Optional):** Use caching mechanisms (e.g., Redis) to enhance API performance.

### 4. API Development
- Develop a REST API to handle:
  - User registration, login, and password reset.
  - QR code creation and (if applicable) management of past QR codes.
- Validate all user inputs and handle errors gracefully.
- Document your API endpoints clearly.

### 5. Deployment
- Deploy your application on any platform (e.g., Vercel, Netlify, Heroku, AWS).
- Provide a working URL for the deployed application.
- Ensure your GitHub repository link is shared and publicly accessible.

### 6. Git & Version Control
- Use Git for version control.
- Follow conventional commit messages, for example:
  - `feat: Add user authentication endpoints`
  - `fix: Correct password reset functionality`
  - `docs: Update README with API usage examples`
- Ensure commits are atomic and commit messages are clear.

### 7. Documentation
- Write a detailed README (like this one) that includes:
  - Installation and setup instructions.
  - API usage examples.
  - Deployment details.
  - Contribution guidelines.
- Ensure the documentation is well-structured and easy to follow.

---

## Example API Usage

**User Registration:**
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**User Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Password Reset:**
```bash
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "your_email@example.com"
}
```

**Generate QR Code:**
```bash
POST /api/qrcode
Content-Type: application/json

{
  "data": "https://example.com",
  "style": {
    "border": "dotted",
    "color": "#000000"
  }
}
```

---

## Evaluation Criteria

You will be evaluated on the following:
- **Code Quality:** Maintain clean, modular code following ES6 (or your framework's style guide) best practices.
- **Functionality:** Ensure that API endpoints, user authentication, and QR code generation work as expected.
- **Documentation:** Provide a comprehensive and clear README.
- **Testing:** Include unit tests covering key functionalities.
- **Deployment:** Successfully deploy the application and provide the working URL.
- **Git Practices:** Use clear, conventional commit messages and maintain a well-organized repository.

---

## Submission Instructions

1. **Fork the Repository:** Fork the starter repository (if provided) and complete your solution.
2. **Deployment:** Deploy your application and verify that it is accessible.
3. **Repository Link:** Ensure your GitHub repository is public.
4. **Issue/PR:** Open an issue or pull request in the repository with the appropriate tag (e.g., `full-stack`, `mern`, or `nextjs`).
5. **Notification:** Tag @samad,@iamahmarfaraz in the issue/PR for review.
6. **Documentation:** Include the link to your live deployment and GitHub repository in your submission.

