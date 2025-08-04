export const uploadAnImage = async (imageFile) => {
  if (!imageFile?.[0]) {
    throw new Error("No file provided");
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (imageFile[0].size > MAX_SIZE) {
    throw new Error("File is too large (max 5MB)");
  }

  const formData = new FormData();
  formData.append("image", imageFile[0]);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`Something went wrong!!!`);
    }
    const uploadData = await response.json();
    return uploadData;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};
