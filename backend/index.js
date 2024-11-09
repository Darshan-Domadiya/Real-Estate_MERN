import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Server started!" });
});

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
