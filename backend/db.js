import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB is connected!");
      })
      .catch((err) => {
        console.log("Error while connecting to Database!", err);
      });
  } catch (error) {
    console.log("ERROR!", error);
  }
}

export default connectDB;
