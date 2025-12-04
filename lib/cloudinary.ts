import { v2 as cloudinary } from "cloudinary";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

// Parse Cloudinary URL if provided, otherwise use individual env vars
function getCloudinaryConfig() {
  if (process.env.CLOUDINARY_URL) {
    // Parse cloudinary://api_key:api_secret@cloud_name
    const url = process.env.CLOUDINARY_URL;
    const match = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
    if (match) {
      return {
        cloud_name: match[3],
        api_key: match[1],
        api_secret: match[2],
      };
    }
  }
  
  // Fallback to individual environment variables
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
}

// Configure Cloudinary
const config = getCloudinaryConfig();
cloudinary.config(config);

export async function uploadImageToCloudinary(
  imagePath: string,
  folder: string = "ecommerce-products"
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${imagePath} to Cloudinary:`, error);
    throw error;
  }
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  fileName: string,
  folder: string = "ecommerce-products"
): Promise<string> {
  try {
    // Create a temporary file
    const tempFilePath = join(tmpdir(), fileName);
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder,
      resource_type: "image",
    });

    // Clean up temporary file
    await unlink(tempFilePath);

    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading buffer to Cloudinary:`, error);
    throw error;
  }
}

