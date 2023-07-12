# Payment Project

This is a payment project that allows users to transfer funds from one wallet to another. The project's frontend is built using React.js, while the backend utilizes Node.js, MongoDB for data storage, JSON Web Token (JWT) for authentication, and bcrypt.js for password hashing.

## Features

- User registration and authentication using JWT.
- Wallet creation and management.
- Transfer funds from one wallet to another.
- Transaction history and details.

## Technologies Used

- Frontend: React.js
- Backend: Node.js
- Database: MongoDB
- Authentication: JSON Web Token (JWT)
- Password Hashing: bcrypt.js

## Prerequisites

Before running the project, ensure that you have the following prerequisites installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/payment-project.git
   ```

2. Install dependencies:

   ```
   cd payment-project
   npm install
   ```

3. Set up the backend:

   - Rename the `.env.example` file to `.env` and update the necessary environment variables such as the database connection string and JWT secret key.

   - Start the backend server:

     ```
     npm run server
     ```

4. Set up the frontend:

   - Update the API endpoint in the `src/config.js` file to match your backend server URL.

   - Start the frontend development server:

     ```
     npm start
     ```

5. Access the application:

   Open your browser and navigate to `http://localhost:3000` to access the payment project.

## Folder Structure

```
payment-project/
├── backend/         # Backend server files
└── frontend/        # Frontend React files
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
- [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js/)

Feel free to modify this README file according to your project's specific details and requirements.
