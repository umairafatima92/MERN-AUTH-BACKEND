
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8000;


connectDB()
  .then(() => {
    console.log(" Database connection successful");
    
    
    app.listen(port, () => {
      console.log(` Server started on PORT: ${port}`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error(" Failed to connect to database:", error);
    process.exit(1);
  });

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-frontend-gray.vercel.app",
  process.env.FRONTEND_URL 
].filter(Boolean); 

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: function(origin, callback) {


    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.get("/", (req, res) => res.send("API working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


app.use((err, req, res, next) => {
  console.error(" Error:", err);
  res.status(500).json({ 
    success: false, 
    message: err.message || "Internal server error" 
  });
});
