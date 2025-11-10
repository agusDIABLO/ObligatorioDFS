import { createImage, deleteImage } from "../services/image-service.mjs";   


// Subida en base64 (para Vercel)
export const uploadImageBase64 = async (req, res) => {
    try {
        const { file } = req.body;
        if (!file) return res.status(400).json({ error: "No se envió la imagen" });

        const result = await createImage(file);
        res.status(200).json({
            secure_url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar imagen
export const removeImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteImage(id);
        res.status(200).json({ message: "Imagen eliminada con éxito", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};