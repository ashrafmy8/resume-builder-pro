# 🚀 GitHub Deployment Guide

## Step 1: Push Code to GitHub

### 1.1 Initialize and Commit
```bash
git init
git add .
git commit -m "Initial commit: Resume Builder Pro website"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New Repository" (green button)
3. Name: `resume-builder-pro`
4. Description: `Professional resume builder website with AI suggestions and paywall`
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README (we already have one)
7. Click "Create Repository"

### 1.3 Connect and Push
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/resume-builder-pro.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Frontend on Vercel (Recommended)

### 2.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `resume-builder-pro` repository
5. Click "Import"

### 2.2 Configure Environment Variables
In Vercel dashboard, add these environment variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.herokuapp.com
NEXTAUTH_URL=https://your-site.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_change_this_in_production
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 2.3 Deploy
- Click "Deploy"
- Your website will be live at: `https://your-site.vercel.app`

## Step 3: Deploy Backend on Railway

### 3.1 Prepare Backend for Deployment
Create `backend/Procfile`:
```
web: npm start
```

### 3.2 Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select the `backend` folder as root directory

### 3.3 Configure Backend Environment Variables
In Railway dashboard, add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_flutterwave_secret_key
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_flutterwave_public_key
FRONTEND_URL=https://your-site.vercel.app
PORT=5000
```

## Step 4: Setup Database (MongoDB Atlas)

### 4.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up for free account
3. Create a new cluster (free tier)
4. Create a database user
5. Whitelist your IP (or use 0.0.0.0/0 for all IPs)

### 4.2 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Add this to your environment variables

## Step 5: Alternative - GitHub Pages (Static Only)

### For Static Export (No Backend Features)
```bash
# Build static version
npm run build
npm run export

# The 'out' folder can be deployed to GitHub Pages
```

**Note**: GitHub Pages only supports static sites, so backend features (auth, payments, AI) won't work.

## Step 6: Custom Domain (Optional)

### 6.1 Buy Domain
- Namecheap, GoDaddy, or any domain registrar
- Example: `resumebuilderpro.com`

### 6.2 Configure DNS
Point your domain to Vercel:
1. Add CNAME record: `www` → `cname.vercel-dns.com`
2. Add A record: `@` → Vercel IP addresses

### 6.3 Add Domain in Vercel
1. Go to your project settings in Vercel
2. Add your custom domain
3. Vercel will automatically handle HTTPS

## 🌐 Final Result

After deployment, your users will access:
- **Homepage**: `https://your-site.vercel.app/`
- **Templates**: `https://your-site.vercel.app/templates/`
- **Builder**: `https://your-site.vercel.app/builder/`
- **Login**: `https://your-site.vercel.app/login/`

Your resume builder website will be live and accessible worldwide! 🎉

## 🔧 Maintenance

### Updates
```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push

# Vercel will automatically redeploy
```

### Monitoring
- Check Vercel dashboard for deployment status
- Monitor Railway for backend health
- Check MongoDB Atlas for database metrics