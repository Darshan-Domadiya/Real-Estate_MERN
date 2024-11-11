import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server started!" });
});

connectDB();

// Routes...
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server error!";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(8000, () => {
  console.log("Server is running on port: 3000");
});
