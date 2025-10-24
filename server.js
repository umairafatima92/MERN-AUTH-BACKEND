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

connectDB();

const allowedOrigins = [
     "http://localhost:5173"
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
console.log(process.env.PORT);


app.listen(port, () => console.log(`server started on PORT:${port}`));
 