// Asegúrate de que estás importando el tipo APIRoute de manera correcta
import type { APIRoute } from "astro";
import { v2 as cloudinary, type UploadApiErrorResponse } from 'cloudinary';

// Configurar cloudinary
cloudinary.config({ 
  cloud_name: 'djwwpklt9', 
  api_key: '455112568867495', 
  api_secret: import.meta.env.SECRET_PASSWORD
})

const uploadStream = async (buffer: Uint8Array, options: { 
  folder: string 
}):Promise<UploadApiErrorResponse> => {
  return new Promise((resolve, reject) => {
   cloudinary
       .uploader
        .upload_stream(options, (error, result) => {
          if(result) return resolve(result);
        reject(error);
    }).end(buffer)
  });
};

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData(); // JavaScript puro
    // const file = formData.get("file") as File;
    const file = formData.get("file") as File | null;

    if(!file){
        return new Response("No se ha encontrado el archivo", { status: 400 });
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const unit8Array = new Uint8Array(arrayBuffer);

    const result = await uploadStream(unit8Array, {
      folder: 'pdf'
    });
   
      const { 
        asseet_id: id,
        url,
        pages
      } = result;

    console.log(result)
   
    // Esperar antes de continuar
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Devolver una respuesta adecuada
    return new Response(JSON.stringify());
};
