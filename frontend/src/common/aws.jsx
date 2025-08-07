import axios from "axios";

export const uploadImage = async (img) => {
  try {
    // Step 1: Get pre-signed URL
    const {
      data: { uploadURL },
    } = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url");

    // Step 2: Upload the image directly to S3
    await axios.put(uploadURL, img, {
      headers: {
        "Content-Type": img.type,
      },
    });

    // Step 3: Return the final image URL (without query params)
    return uploadURL.split("?")[0];
  } catch (err) {
    console.error("Image upload failed:", err);
    return null;
  }
};
