import express from "express";
import { uploadImageBase64, removeImage } from "../../controllers/image-controller.mjs";


const router = express.Router();

// Subir imagen desde base64
router.post("/", uploadImageBase64);

// Eliminar imagen
router.delete("/:id", removeImage);

export default router;