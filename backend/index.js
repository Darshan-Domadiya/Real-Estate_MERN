import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Server started!" });
});

connectDB();

const __dirname = path.resolve();

// Routes...
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(8000, () => {
  console.log("Server is running on port: 3000");
});

// app.use((err, req, res, next) => {
//   const statusCode = err.status || 500;
//   const message = err.message || "Internal Server error!";

//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
