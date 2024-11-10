import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Server started!" });
});

connectDB();

// Routes...
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
