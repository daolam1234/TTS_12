export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset"); // thay "your_unsigned_preset" đúng tên preset của bạn

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/diomg2vwr/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Cloudinary upload error:", errorData);
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  return data.secure_url;
};
