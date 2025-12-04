# Database Seeding with Cloudinary and Supabase

This guide will help you seed your database with products using Cloudinary for image storage and Supabase as your PostgreSQL database.

## Prerequisites

1. **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
2. **Cloudinary Account**: Sign up at [cloudinary.com](https://cloudinary.com)

## Setup Instructions

### 1. Get Your Supabase Database URL

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Copy the **Connection string** (URI format)
4. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 2. Get Your Cloudinary Credentials

1. Go to your Cloudinary dashboard
2. Navigate to **Settings** → **Access Keys**
3. Copy the following:
   - **Cloud name**
   - **API Key**
   - **API Secret**

### 3. Create Environment Variables

Create a `.env` file in the root of your project (or update your existing one):

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NextAuth (optional, for authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Database Schema to Supabase

```bash
npm run db:push
```

This will create the tables (User, Product, Category, Order, OrderItem) in your Supabase database.

### 6. Run the Seed Script

```bash
npm run db:seed
```

This script will:
1. ✅ Create categories (Audio, Phones, Wearables, Gaming, Cameras, Laptops, Electronics)
2. ✅ Upload product images from the `assets/` folder to Cloudinary
3. ✅ Create products in your Supabase database with Cloudinary image URLs

## Products That Will Be Seeded

The seed script will create 10 products:

1. Apple Earphones - $299.99
2. Bose QuietComfort 45 - $329.99
3. Samsung Galaxy S23 - $799.99
4. Garmin Venu 2 - $349.99
5. PlayStation 5 - $499.99
6. Canon EOS R5 - $3,899.99
7. MacBook Pro 16 - $2,499.99
8. Sony WF-1000XM5 - $299.99
9. Samsung Projector 4k - $1,499.99
10. ASUS ROG Zephyrus G16 - $1,999.99

## Troubleshooting

### Error: "Cloudinary credentials not found"
- Make sure your `.env` file has all three Cloudinary variables set
- Check that the variable names match exactly (case-sensitive)

### Error: "Cannot connect to database"
- Verify your `DATABASE_URL` is correct
- Make sure your Supabase project is active
- Check if your IP is allowed in Supabase (Settings → Database → Connection Pooling)

### Error: "Image file not found"
- Ensure all product images exist in the `assets/` folder
- Check that image filenames match exactly (case-sensitive)

### Error: "Prisma Client not generated"
- Run `npm run db:generate` first
- Make sure Prisma schema is valid

## Notes

- The seed script uses `upsert` operations, so running it multiple times won't create duplicates
- Images are uploaded to Cloudinary in the `ecommerce-products` folder
- Each product gets a unique Cloudinary URL that's stored in the database
- Categories are created automatically based on product data


