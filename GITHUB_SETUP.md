# GitHub Setup Guide

Follow these steps to deploy your Social Media Dashboard to GitHub.

## Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Social Media Dashboard"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `social-media-dashboard`)
4. Choose public or private
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/social-media-dashboard.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Deploy to Vercel (Easiest Option)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your `social-media-dashboard` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"
7. Your app will be live in ~2 minutes!

## Step 5: Set Up Environment Variables (Optional)

In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add if needed:
   - `ALLOWED_ORIGINS` = `https://your-app.vercel.app`
   - `API_KEYS` = `your_secret_key`

## Step 6: Enable GitHub Actions (Optional)

The repository includes GitHub Actions for CI/CD:

1. **CI Workflow** - Runs automatically on every push/PR
   - Tests the build
   - Checks for errors
   - No setup needed!

2. **Deploy Workflow** - Auto-deploys to Vercel (optional)
   - Requires Vercel tokens
   - See DEPLOYMENT.md for setup instructions

## Troubleshooting

### Authentication Issues
```bash
# If you get authentication errors, use SSH instead:
git remote set-url origin git@github.com:YOUR_USERNAME/social-media-dashboard.git
```

### Push Rejected
```bash
# If push is rejected, pull first:
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### GitHub Actions Not Running
- Make sure workflows are in `.github/workflows/` directory
- Check Actions tab in GitHub repository
- Verify workflow files have correct syntax

## Next Steps

- ✅ Code is on GitHub
- ✅ Deployed to Vercel
- ✅ CI/CD is running
- 🎉 Your dashboard is live!

## Repository Structure

Your repository should look like:
```
social-media-dashboard/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Continuous Integration
│       └── deploy.yml      # Auto-deployment
├── app/
├── components/
├── lib/
├── README.md
├── DEPLOYMENT.md
├── vercel.json
└── package.json
```

## Useful Commands

```bash
# Check git status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

## Support

- GitHub Docs: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

