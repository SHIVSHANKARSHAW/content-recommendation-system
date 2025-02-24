import mongoose from "mongoose";

export default function connectToDatabase() {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to Database successfully"));
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
  }
}