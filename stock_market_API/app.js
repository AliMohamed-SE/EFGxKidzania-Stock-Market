import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db/database.js";

import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import container from "./container.js";
import UserRoutes from "./src/User/UserRoutes.js";
import { ValidationError } from "express-validation";

config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Define the routes
const userController = container.resolve("userController");

app.use("/api/users", UserRoutes(userController));

// Error Handler
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // Extract specific details of the validation error
    return res.status(err.statusCode).json({
      message: "Validation Failed",
      details: err.details.body, // Provide detailed validation errors (adjust based on validation type)
    });
  }

  // Handle other errors
  return res.status(500).json({ message: "Internal Server Error" });
});

const startServer = async () => {
  try {
    // Start DB connection
    await connectToDB();

    // Start Server
    app.listen(PORT, (err) => {
      if (err) {
        console.error(`Error starting server: ${err.message}`);
      } else {
        console.log(`Server is running on port ${PORT}`);
      }
    });
  } catch (error) {
    console.error("Error starting the application:", error);
  }
};

startServer();
