# 🚀 GitHub Deployment - Complete Step-by-Step Guide

## 📋 Before You Start

Make sure you have:
- ✅ A GitHub account (free at github.com)
- ✅ Your project zip file (resume-builder-pro-clean.zip)
- ✅ Environment variables ready (.env values)

## 🎯 Method 1: Direct GitHub Upload (Recommended)

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** (top right) → "New repository"
3. **Fill in details:**
   - Repository name: `resume-builder-pro`
   - Description: `Professional resume builder website with AI suggestions and paywall`
   - Visibility: **Public** (required for free deployment)
   - ❌ Don't initialize with README, .gitignore, or license
4. **Click "Create repository"**

### Step 2: Upload Your Project

**Option A: Upload Zip Contents**
1. **Extract your zip file** to a temporary folder
2. **On GitHub repository page**, click "uploading an existing file"
3. **Drag all extracted files** into the upload area
4. **Commit message**: "Initial commit: Resume Builder Pro website"
5. **Click "Commit changes"**

**Option B: Upload Individual Folders**
1. **Create folder structure** on GitHub:
   - Click "Create new file"
   - Type `src/` and GitHub will create the folder
   - Upload files to each folder
2. **Repeat for**: backend/, public/, etc.

### Step 3: Verify Upload

Check that your repository contains:
- ✅ `src/` folder (frontend code)
- ✅ `backend/` folder (API code)
- ✅ `public/` folder (static assets)
- ✅ `package.json` (dependencies)
- ✅ Configuration files (vercel.json, netlify.toml)
- ✅ Documentation files (README.md)

## 🌐 Step 2: Deploy Frontend to Vercel

### Deploy Frontend

1. **Go to Vercel.com**
2. **Sign in with GitHub** account
3. **Click "New Project"**
4. **Import your repository**: `resume-builder-pro`
5. **Configure project:**
   - Framework Preset: **Next.js**
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Click "Deploy"**

### Add Environment Variables

In Vercel dashboard:
1. **Go to Settings** → Environment Variables
2. **Add these variables:**

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXTAUTH_URL=https://your-site.vercel.app
NEXTAUTH_SECRET=your_secure_random_string_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

3. **Redeploy** after adding variables

## 🖥️ Step 3: Deploy Backend to Railway

### Deploy Backend

1. **Go to Railway.app**
2. **Sign in with GitHub**
3. **Click "New Project"** → "Deploy from GitHub repo"
4. **Select your repository**: `resume-builder-pro`
5. **Important**: Set Root Directory to `backend/`
6. **Click "Deploy"**

### Add Backend Environment Variables

In Railway dashboard:
1. **Go to Variables** tab
2. **Add these variables:**

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resume-builder
JWT_SECRET=your_super_secure_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_key
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_key
FRONTEND_URL=https://your-site.vercel.app
PORT=5000
```

3. **Redeploy** backend

## 💾 Step 4: Setup Database (MongoDB Atlas)

### Create Database

1. **Go to MongoDB.com/atlas**
2. **Sign up** for free account
3. **Create cluster** (free tier)
4. **Create database user**:
   - Username: `admin`
   - Password: Generate secure password
5. **Whitelist IP**: Add `0.0.0.0/0` (allow all)
6. **Get connection string**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Update Environment Variables

1. **Update Railway backend** with real MongoDB URI
2. **Redeploy backend**

## 🎉 Step 5: Test Your Live Website

### Your Website URLs

After deployment:
- **Frontend**: `https://resume-builder-pro.vercel.app`
- **Backend API**: `https://resume-builder-pro.railway.app`

### Test Features

1. **Homepage** - Should load with navigation and hero section
2. **Registration** - Create new user account
3. **Login** - Sign in with email/password
4. **Templates** - View resume templates
5. **Builder** - Create a resume
6. **AI Suggestions** - Test content generation
7. **Paywall** - Try to download/email (should prompt for payment)

## 🔧 Step 6: Custom Domain (Optional)

### Add Custom Domain

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **In Vercel dashboard**:
   - Go to Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. **Update environment variables** with new domain

## 🔄 Step 7: Updates and Maintenance

### Making Changes

1. **Edit files** in GitHub repository
2. **Commit changes**
3. **Vercel/Railway auto-deploy** new versions

### Monitoring

- **Vercel Dashboard**: Check deployment status
- **Railway Dashboard**: Monitor backend health
- **MongoDB Atlas**: Database metrics

## 🆘 Troubleshooting

### Common Issues

1. **Build fails**: Check package.json dependencies
2. **Environment variables**: Ensure all required vars are set
3. **Database connection**: Verify MongoDB URI
4. **API calls fail**: Check CORS settings and API URL

### Getting Help

- Check deployment logs in Vercel/Railway
- Verify all environment variables are set
- Test API endpoints individually

## ✅ Success Checklist

Your website is fully deployed when:
- ✅ Frontend loads at Vercel URL
- ✅ Backend responds at Railway URL  
- ✅ Database connects successfully
- ✅ User registration works
- ✅ AI suggestions work
- ✅ Payment system activates
- ✅ All features functional

**Your resume builder website is now live and accessible worldwide!** 🌍