import axios from "axios";

const uploadToCloudinary = async (file: any, Id: number) => {
    console.log(file);
    
    try {
        const formData = new FormData();
        formData.append('file', `data:image/jpg;base64,${file}`);
        formData.append("api_key", process.env.NEXT_PUBLIC_VITE_CLOUDINARY_KEY as string);
        formData.append("folder", "models3d")
        formData.append('upload_preset', process.env.NEXT_PUBLIC_VITE_UPLOAD as string); // Reemplaza TU_PRESET_DE_SUBIDA con tu propio preset de subida en Cloudinary
        formData.append('public_id', `${Id}`);

        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/coderx/image/upload',
            formData,
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            }
        );

        // Aquí puedes realizar acciones con los datos de respuesta
        return response.data.secure_url
    } catch (error) {
        console.error('Error al subir la imagen:', error);
    }
};

export default uploadToCloudinary;