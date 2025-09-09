import mongoose from "mongoose";

export default function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
}
