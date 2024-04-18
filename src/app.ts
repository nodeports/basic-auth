import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
