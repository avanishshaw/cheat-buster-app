# Vercel Deployment Guide

This guide will walk you through deploying the Cheat Buster frontend to Vercel with environment variables.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your backend API URL (where your backend is deployed)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Push Your Code to Git

Make sure your code is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect your project settings

### 3. Configure Project Settings

In the **"Configure Project"** step:

- **Framework Preset**: Select "Vite" (or leave as auto-detected)
- **Root Directory**: Set to `frontend` (since your frontend is in the frontend folder)
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist` (should be auto-filled)
- **Install Command**: `npm install` (should be auto-filled)

### 4. Add Environment Variables

Before deploying, add your environment variables:

1. In the project configuration, find the **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add the following variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.herokuapp.com/api` or `https://api.yourdomain.com/api`)
   - **Environment**: Select all (Production, Preview, Development)

### 5. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually takes 1-2 minutes)
3. Once deployed, you'll get a URL like `https://your-app.vercel.app`

## Environment Variables

### Required Variables

- `VITE_API_BASE_URL` - Your backend API base URL
  - Development: `http://localhost:3000/api`
  - Production: `https://your-backend-url.com/api`

### Important Notes

- All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser
- Environment variables are injected at build time
- After adding new environment variables, you need to redeploy

## Local Development

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

This file is already in `.gitignore` and won't be committed to your repository.

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### API Calls Not Working

- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check CORS settings on your backend to allow requests from your Vercel domain
- Ensure your backend API is publicly accessible

### Environment Variables Not Working

- Make sure the variable name starts with `VITE_`
- Redeploy after adding/updating environment variables
- Check that the variable is added to all environments (Production, Preview, Development)

## Updating Environment Variables

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add or edit variables
4. **Redeploy** the project for changes to take effect

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates


