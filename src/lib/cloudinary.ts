
interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: 'dobktsnix',
  uploadPreset: 'Real-Estate'
};

export const getOptimizedImageUrl = (publicId: string, width?: number, height?: number) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  let transformations = 'f_auto,q_auto';
  
  if (width && height) {
    transformations += `,w_${width},h_${height},c_fill`;
  } else if (width) {
    transformations += `,w_${width}`;
  }
  
  return `${baseUrl}/${transformations}/${publicId}`;
};

export const getVideoUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/f_auto,q_auto/${publicId}`;
};

export const uploadToCloudinary = async (file: File, folder: string = 'properties'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.public_id;
};
