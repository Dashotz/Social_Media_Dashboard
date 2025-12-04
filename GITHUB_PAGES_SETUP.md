# GitHub Pages Deployment Guide

This guide will help you deploy your Social Media Dashboard to GitHub Pages, just like https://dashotz.github.io/weather/

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `social-media-dashboard` (or your preferred name)
4. Choose **Public** (required for free GitHub Pages)
5. **Don't** initialize with README
6. Click "Create repository"

## Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Social Media Dashboard"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/social-media-dashboard.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `main` or `master`
   - Folder: `/ (root)`
5. Click **Save**

## Step 4: Enable GitHub Actions

1. Still in **Settings**
2. Go to **Actions** → **General**
3. Under **Workflow permissions**, select:
   - **Read and write permissions**
   - ✅ Allow GitHub Actions to create and approve pull requests
4. Click **Save**

## Step 5: Trigger Deployment

The GitHub Actions workflow will automatically:
- Build your Next.js app
- Deploy to GitHub Pages
- Make it available at: `https://YOUR_USERNAME.github.io/social-media-dashboard/`

### Manual Trigger (if needed)

1. Go to **Actions** tab in your repository
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## Step 6: Update Repository Name (if different)

If your repository name is different, update `next.config.mjs`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

Then commit and push:
```bash
git add next.config.mjs
git commit -m "Update basePath for GitHub Pages"
git push
```

## Your Site Will Be Live At:

```
https://YOUR_USERNAME.github.io/social-media-dashboard/
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `social-media-dashboard` with your repository name

## Important Notes

### ⚠️ Static Export Limitations

Since GitHub Pages is static hosting:
- ✅ All frontend features work
- ✅ Mock data works (fetched client-side)
- ❌ API routes don't work (converted to client-side)
- ❌ Scheduled posts are stored in browser localStorage (demo only)

### For Production Use

If you need server-side features:
- Use Vercel, Netlify, or similar platforms
- Or set up a separate backend API

## Troubleshooting

### Build Fails
- Check Actions tab for error messages
- Ensure `next.config.mjs` has `output: 'export'`
- Verify all dependencies are in `package.json`

### Site Not Loading
- Wait 5-10 minutes after first deployment
- Check repository Settings → Pages for status
- Verify the workflow completed successfully

### 404 Errors
- Ensure `basePath` in `next.config.mjs` matches your repo name
- Check that `trailingSlash: true` is set
- Clear browser cache

### Images Not Loading
- Images use `unoptimized: true` for static export
- External images should work fine

## Updating Your Site

Every time you push to the `main` branch:
1. GitHub Actions automatically builds
2. Deploys to GitHub Pages
3. Your site updates in 2-5 minutes

```bash
# Make changes, then:
git add .
git commit -m "Update dashboard"
git push
```

## Custom Domain (Optional)

1. Add a `CNAME` file to your repository root:
   ```
   yourdomain.com
   ```

2. In GitHub Settings → Pages:
   - Enter your custom domain
   - GitHub will provide DNS records

## Support

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

