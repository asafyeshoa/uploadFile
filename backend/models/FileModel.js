import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", FileSchema);
export default File;
