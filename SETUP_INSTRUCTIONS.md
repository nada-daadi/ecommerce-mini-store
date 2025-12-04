# Quick Setup Guide - Push Assets to Cloudinary & Supabase

## Step 1: Get Your Credentials

### Supabase Database URL
1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project (or create a new one)
3. Go to **Settings** → **Database**
4. Under **Connection string**, select **URI**
5. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
6. Replace `[YOUR-PASSWORD]` with your actual database password

### Cloudinary Credentials
You can use either method:

**Option 1: Cloudinary URL (Recommended)**
1. Go to [cloudinary.com](https://cloudinary.com) and sign in
2. Go to **Dashboard**
3. Copy the **Cloudinary URL** (format: `cloudinary://api_key:api_secret@cloud_name`)

**Option 2: Individual Credentials**
1. Go to [cloudinary.com](https://cloudinary.com) and sign in
2. Go to **Dashboard**
3. Copy these three values:
   - **Cloud name** (shown at the top)
   - **API Key** (under Account Details)
   - **API Secret** (click "Reveal" to see it)

## Step 2: Create .env File

Create a `.env` file in the root of your project with:

```env
# Supabase Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# Cloudinary (Option 1: Use URL - Recommended)
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

# OR Cloudinary (Option 2: Use individual credentials)
# CLOUDINARY_CLOUD_NAME=your_cloud_name_here
# CLOUDINARY_API_KEY=your_api_key_here
# CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important:** Replace all placeholder values with your actual credentials!

## Step 3: Generate Prisma Client

```bash
npm run db:generate
```

This creates the Prisma client based on your schema.

## Step 4: Push Schema to Supabase

```bash
npm run db:push
```

This creates all the tables (User, Product, Category, Order, OrderItem) in your Supabase database.

## Step 5: Run the Seed Script

```bash
npm run db:seed
```

This will:
- ✅ Create categories (Audio, Phones, Wearables, Gaming, Cameras, Laptops, Electronics)
- ✅ Upload all product images from `assets/` folder to Cloudinary
- ✅ Create products in Supabase with Cloudinary image URLs

## What Gets Created

### Categories:
- Audio
- Phones
- Wearables
- Gaming
- Cameras
- Laptops
- Electronics

### Products (10 total):
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

### Error: "Cannot find module '@prisma/client'"
Run: `npm install @prisma/client`

### Error: "Environment variable not found"
- Make sure your `.env` file is in the root directory
- Check that variable names match exactly (case-sensitive)
- Restart your terminal after creating `.env`

### Error: "Cannot connect to database"
- Verify your Supabase project is active
- Check your database password is correct
- Make sure your IP is allowed (Supabase → Settings → Database → Connection Pooling)

### Error: "Cloudinary upload failed"
- Verify all three Cloudinary credentials are correct
- Check that image files exist in the `assets/` folder
- Ensure image filenames match exactly (case-sensitive)

### Error: "Image file not found"
Make sure these files exist in the `assets/` folder:
- apple_earphone_image.png
- bose_headphone_image.png
- samsung_s23phone_image.png
- venu_watch_image.png
- playstation_image.png
- cannon_camera_image.png
- macbook_image.png
- sony_airbuds_image.png
- projector_image.png
- asus_laptop_image.png

## Success!

Once the seed script completes, you should see:
- ✅ All categories created
- ✅ All images uploaded to Cloudinary
- ✅ All products created in Supabase

You can verify in:
- **Cloudinary Dashboard**: Check the `ecommerce-products` folder
- **Supabase Dashboard**: Go to Table Editor and check the `Product` and `Category` tables

