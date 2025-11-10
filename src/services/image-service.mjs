import cloudinary from "../config/cloudinary-config.mjs";

// Subir imagen desde base64 o URL
export const createImage = async (file) => {
    try {
        // `file` puede ser base64 o URL temporal
        const result = await cloudinary.uploader.upload(file, {
            folder: "vercel_uploads",
        });
        return result;
    } catch (error) {
        throw new Error("Error al subir la imagen: " + error.message);
    }
};

// Eliminar imagen por public_id
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("Error al borrar la imagen: " + error.message);
    }
};