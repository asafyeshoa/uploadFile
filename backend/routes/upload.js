import { Router } from "express";
import multer from "multer";
import filesController from "../controllers/upload.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const fileName = await filesController.uploadFile(file);

    res.status(200).send({ message: "File processed and saved", fileName });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
