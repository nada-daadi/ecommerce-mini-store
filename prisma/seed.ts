import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { uploadImageToCloudinary } from "../lib/cloudinary";

const prisma = new PrismaClient();

// Product data with categories
const productsData = [
  {
    name: "Apple Earphones",
    description: "Noise-cancellation, 40-hour battery",
    price: 299.99,
    stock: 50,
    rating: 4.5,
    category: "Audio",
    imageFile: "apple_earphone_image.png",
  },
  {
    name: "Bose QuietComfort 45",
    description: "Noise Cancellation, 24-hour battery",
    price: 329.99,
    stock: 30,
    rating: 4.5,
    category: "Audio",
    imageFile: "bose_headphone_image.png",
  },
  {
    name: "Samsung Galaxy S23",
    description: "Fitness Tracking, AMOLED Display",
    price: 799.99,
    stock: 25,
    rating: 4.5,
    category: "Phones",
    imageFile: "samsung_s23phone_image.png",
  },
  {
    name: "Garmin Venu 2",
    description: "Fitness Tracking, AMOLED Display",
    price: 349.99,
    stock: 40,
    rating: 4.5,
    category: "Wearables",
    imageFile: "venu_watch_image.png",
  },
  {
    name: "PlayStation 5",
    description: "Ultra-HD, 825GB SSD, Ray Graphics",
    price: 499.99,
    stock: 20,
    rating: 4.5,
    category: "Gaming",
    imageFile: "playstation_image.png",
  },
  {
    name: "Canon EOS R5",
    description: "45MP Sensor, 8K Video Recording",
    price: 3899.99,
    stock: 15,
    rating: 4.5,
    category: "Cameras",
    imageFile: "cannon_camera_image.png",
  },
  {
    name: "MacBook Pro 16",
    description: "M2 Pro Chip, 16GB RAM, 512GB SSD",
    price: 2499.99,
    stock: 18,
    rating: 4.5,
    category: "Laptops",
    imageFile: "macbook_image.png",
  },
  {
    name: "Sony WF-1000XM5",
    description: "Noise-Cancellation, Hi-Res Audio",
    price: 299.99,
    stock: 35,
    rating: 4.5,
    category: "Audio",
    imageFile: "sony_airbuds_image.png",
  },
  {
    name: "Samsung Projector 4k",
    description: "4K Ultra HD, Realistic, Built-In Speaker",
    price: 1499.99,
    stock: 12,
    rating: 4.5,
    category: "Electronics",
    imageFile: "projector_image.png",
  },
  {
    name: "ASUS ROG Zephyrus G16",
    description: "Intel Core i9, RTX 4070, 16GB, 1TB",
    price: 1999.99,
    stock: 22,
    rating: 4.5,
    category: "Laptops",
    imageFile: "asus_laptop_image.png",
  },
];

async function main() {
  console.log("🌱 Starting seed process...");

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_URL && (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
    console.error("❌ Cloudinary credentials not found in environment variables!");
    console.error("Please set CLOUDINARY_URL or set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET");
    process.exit(1);
  }

  // Get unique categories
  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );

  console.log("📦 Creating categories...");
  const categoryMap = new Map<string, string>();

  for (const categoryName of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    categoryMap.set(categoryName, category.id);
    console.log(`✅ Created/Found category: ${categoryName}`);
  }

  console.log("\n📸 Uploading images to Cloudinary and creating products...");
  const assetsPath = join(process.cwd(), "assets");

  for (const productData of productsData) {
    try {
      // Read image file
      const imagePath = join(assetsPath, productData.imageFile);
      console.log(`\n📤 Uploading ${productData.imageFile}...`);

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadImageToCloudinary(
        imagePath,
        "ecommerce-products"
      );
      console.log(`✅ Uploaded: ${cloudinaryUrl}`);

      // Get category ID
      const categoryId = categoryMap.get(productData.category);
      if (!categoryId) {
        throw new Error(`Category not found: ${productData.category}`);
      }

      // Create product
      const product = await prisma.product.upsert({
        where: { name: productData.name },
        update: {
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          images: [cloudinaryUrl],
          categoryId: categoryId,
        },
        create: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          images: [cloudinaryUrl],
          categoryId: categoryId,
        },
      });

      console.log(`✅ Created product: ${product.name}`);
    } catch (error) {
      console.error(`❌ Error processing ${productData.name}:`, error);
    }
  }

  console.log("\n✨ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

