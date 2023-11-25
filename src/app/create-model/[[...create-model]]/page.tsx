"use client"
import uploadToCloudinary from '@/app/services/UploadCloudinary';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'

export default function page() {
    const [selectedFile, setSelectedFile] = useState<File | any>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        setSelectedFile(file);
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Error al convertir el archivo a Base64.'));
            }
          };
          reader.readAsDataURL(file);
        });
      };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const path = await uploadToCloudinary(await convertFileToBase64(selectedFile), 1);
        const formData = new FormData();
        formData.append('name', "");
        formData.append('description', "");
        formData.append('Iduser', "");
        formData.append('price', "");
        formData.append('file', selectedFile);
        formData.append("modeluri", path);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/models?username=${process.env.NEXT_PUBLIC_AUTH_API}`, formData)
    };
  return (
    <div className='flex flex-col flex-wrap items-center justify-center'>
        <form action="" onSubmit={handleSubmit}>
            <input onChange={handleFileChange} type="file" className="border border-gray-300 p-2" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
    </div>
  )
}
