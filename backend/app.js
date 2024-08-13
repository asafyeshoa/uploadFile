import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use(cors());
app.use("/upload", fileUpload);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
