# Render Deployment Guide

This guide will walk you through deploying the Cheat Buster backend to Render with MongoDB Atlas.

## Prerequisites

- A Render account (sign up at [render.com](https://render.com))
- A MongoDB Atlas account (sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas))
- Your frontend URL (where your frontend is deployed, e.g., Vercel)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (choose the free M0 tier)
3. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Create username and password (save these!)
   - Set privileges to **Atlas admin**
4. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - For Render deployment, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render's IP ranges
5. Get your connection string:
   - Go to **Clusters** → Click **"Connect"** → Choose **"Connect your application"**
   - Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password

### 2. Push Your Code to Git

Make sure your backend code is pushed to your Git repository:

```bash
cd backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 3. Deploy to Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository (if not already connected)
4. Select your repository
5. Configure the service:
   - **Name**: `cheat-buster-backend` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., Oregon)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend` (important: since backend is in a subdirectory)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or choose a paid tier)

6. Add Environment Variables:
   Click **"Advanced"** → **"Add Environment Variable"** and add:

   - **NODE_ENV**: `production`
   - **MONGO_URI**: Your MongoDB Atlas connection string
     ```
     mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
     ```
   - **FRONTEND_URL**: Your frontend URL (e.g., `https://your-frontend.vercel.app`)
     - This is important for CORS configuration
   - **PORT**: Leave empty (Render automatically sets this)

7. Click **"Create Web Service"**
8. Wait for deployment to complete (usually 2-5 minutes)

#### Option B: Using render.yaml (Automated)

If you prefer using the `render.yaml` file:

1. Make sure `render.yaml` is in your backend directory
2. In Render dashboard, click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect `render.yaml` and create the service
5. You'll still need to set environment variables in the dashboard:
   - **MONGO_URI**: Your MongoDB Atlas connection string
   - **FRONTEND_URL**: Your frontend URL

### 4. Get Your Backend URL

After deployment, Render will provide a URL like:
- `https://cheat-buster-backend.onrender.com`

**Important**: On the free tier, your service will spin down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds to respond.

### 5. Update Frontend Environment Variable

Update your frontend's `VITE_API_BASE_URL` environment variable in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL` to: `https://cheat-buster-backend.onrender.com/api`
4. Redeploy your frontend

### 6. Seed Your Database (Optional)

If you need to seed your database:

1. In Render dashboard, go to your service
2. Open **Shell** (or use Render's Console)
3. Run:
   ```bash
   node seed.js
   ```

Or run locally:
```bash
cd backend
# Make sure MONGO_URI is set in your .env file
node seed.js
```

## Environment Variables

### Required Variables

- **MONGO_URI**: MongoDB connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Get this from MongoDB Atlas dashboard

- **FRONTEND_URL**: Your frontend URL
  - Example: `https://your-frontend.vercel.app`
  - Used for CORS configuration

### Optional Variables

- **NODE_ENV**: `production` (recommended)
- **PORT**: Automatically set by Render (don't set manually)

## Local Development

Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/cheatbuster
FRONTEND_URL=http://localhost:5173
```

This file is already in `.gitignore` and won't be committed.

## Troubleshooting

### Service Won't Start

- Check build logs in Render dashboard
- Verify `start` script is in `package.json`
- Check that all dependencies are listed in `package.json`
- Ensure Node.js version is compatible (Render uses Node 18+ by default)

### Database Connection Fails

- Verify `MONGO_URI` is set correctly in Render environment variables
- Check MongoDB Atlas network access allows Render's IPs (or set to 0.0.0.0/0)
- Verify database user credentials are correct
- Check MongoDB Atlas cluster is running

### CORS Errors

- Verify `FRONTEND_URL` is set correctly in Render
- Check that your frontend URL matches exactly (including https/http and trailing slash)
- Review browser console for specific CORS error messages

### Service Spins Down (Free Tier)

- Free tier services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to a paid tier to avoid spin-downs

### Environment Variables Not Working

- Make sure variables are set in Render dashboard (not just in code)
- Redeploy after adding/updating environment variables
- Check variable names match exactly (case-sensitive)

## Updating Environment Variables

1. Go to your service in Render dashboard
2. Navigate to **Environment** tab
3. Add or edit variables
4. Click **"Save Changes"**
5. Service will automatically redeploy

## Custom Domain (Optional)

1. Go to **Settings** → **Custom Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. Render will automatically provision SSL certificates

## Database Migration/Seeding

To seed your production database:

1. Create a temporary script or use Render Shell
2. Connect to your production MongoDB using `MONGO_URI`
3. Run your seed script

Example using Render Shell:
```bash
# In Render Shell (accessed from service dashboard)
MONGO_URI="your-atlas-connection-string" node seed.js
```

## Monitoring

- Check **Logs** tab in Render dashboard for real-time logs
- Monitor **Metrics** for CPU, memory, and request metrics
- Set up alerts in Render dashboard for service failures


