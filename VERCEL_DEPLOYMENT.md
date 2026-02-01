# Vercel Deployment Guide

## Overview
This guide help deploy both your frontend (React/Vite) and backend (Express) to Vercel.

## Prerequisites
- GitHub account with your project repository
- Vercel account (vercel.com)
- Environment variables ready (API keys, email credentials)

---

## Step 1: Deploy Backend to Vercel

### 1.1 Connect Backend to GitHub
- Push your entire project (including `/server` folder) to GitHub
- Make sure the repository is public or connected to your Vercel account

### 1.2 Create Vercel Project for Backend
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. **Framework Preset**: Select "Node.js"
5. **Root Directory**: Set to `server` (important!)
6. Click "Deploy"

### 1.3 Configure Environment Variables
After deployment:
1. Go to your project settings → "Environment Variables"
2. Add these variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email app password

3. Redeploy to apply environment variables:
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

### 1.4 Get Backend URL
- After deployment, you'll see a URL like: `https://your-project-server.vercel.app`
- **Copy this URL** - you'll need it for the frontend

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Update Environment Variables
1. In your project root (not /server):
   - Open `.env.production`
   - Replace `https://your-backend-deployment.vercel.app` with your actual backend URL from Step 1.4
   - Example: `VITE_API_URL=https://your-project-server.vercel.app`

### 2.2 Create Vercel Project for Frontend
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. **Framework Preset**: Select "Vite"
5. **Root Directory**: Leave as default (root folder)
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. Click "Deploy"

### 2.3 Configure Frontend Environment Variables
After deployment:
1. Go to project settings → "Environment Variables"
2. Add: `VITE_API_URL` with your backend URL
   - Example: `VITE_API_URL=https://your-project-server.vercel.app`
3. Make sure it's set for Production, Preview, and Development
4. Redeploy to apply

---

## Step 3: Verify Deployment

### Test Backend
- Visit your backend URL in browser: `https://your-project-server.vercel.app`
- You should see an error page (expected for GET request)

### Test Frontend
- Visit your frontend URL: `https://your-project.vercel.app`
- Test the chatbot - it should communicate with the backend
- Test contact form submission
- Test location services

### Troubleshooting Common Issues

**"Cannot POST /chat" error:**
- Ensure backend is deployed and URL is correct in `.env.production`
- Check that backend `PORT` environment variable is NOT set (Vercel manages this)

**"Email not sending":**
- Verify `EMAIL_USER` and `EMAIL_PASS` are set in backend environment variables
- For Gmail, use an "App Password" not your regular password

**"API not found" in chatbot:**
- Verify `VITE_API_URL` is set correctly in frontend environment variables
- Clear browser cache and reload
- Check browser console for exact error message

---

## Step 4: Future Updates

### When you make changes:
1. Push to GitHub
2. Vercel automatically deploys on push
3. Changes are live after deployment completes

### If you need to manually redeploy:
- Dashboard → Your Project → "Deployments"
- Click the three dots → "Redeploy"

---

## File Structure for Deployment

```
project-root/
├── vercel.json (frontend config)
├── vite.config.js
├── package.json (frontend)
├── .env.production (VITE_API_URL=...)
├── .env.local (local development)
├── src/
│   ├── sections/
│   │   ├── ChatWindow.jsx (uses VITE_API_URL)
│   │   ├── Contact.jsx (uses VITE_API_URL)
│   │   └── ...
│   └── ...
├── server/
│   ├── vercel.json (backend config)
│   ├── package.json
│   ├── index.js
│   ├── routes/
│   │   ├── chat.js
│   │   └── contact.js
│   ├── services/
│   │   └── gemini.js
│   └── .env (local development only)
└── public/
```

---

## Important Notes

✅ **Frontend & Backend are now on separate Vercel projects**
✅ **Environment variables are secure** (not in code)
✅ **Auto-deployment on GitHub push** enabled
✅ **CORS should work** automatically between Vercel domains

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Common Issues: https://vercel.com/support
- Check deployment logs in Vercel dashboard for detailed errors
