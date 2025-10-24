import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

console.log(
  process.env.SMTP_HOST,
  process.env.SMTP_PORT,
  process.env.SMTP_MAIL,
  process.env.SMTP_PASS
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;
