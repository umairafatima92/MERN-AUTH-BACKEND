import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const db = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;
const jwtSecret = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV;
const smtpPass = process.env.SMTP_PASS;
const smtpMail = process.env.SMTP_MAIL;
const smtpHost = process.env.SMTP_HOST;
const smtpService = process.env.SMTP_SERVICE;
const smtpPort = process.env.SMTP_PORT;

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-frontend-gray.vercel.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

connectDB();

app.get("/", (req, res) => res.send("API working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

console.log(`PORT: ${port}`);
console.log(`DB URI: ${db}`);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
