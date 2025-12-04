# Troubleshooting GitHub Pages Deployment

If your GitHub Actions workflows are failing, follow these steps:

## Common Issues and Solutions

### 1. Workflow Fails at Build Step

**Symptoms**: Build step fails with errors

**Solutions**:
- Check the Actions tab for detailed error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (18+)
- Run `npm install` locally to check for dependency issues

### 2. "out directory not found" Error

**Symptoms**: Build completes but verification fails

**Solutions**:
- Ensure `output: 'export'` is set in `next.config.mjs`
- Check that `NODE_ENV=production` is set in the workflow
- Verify no build errors occurred (check logs)

### 3. GitHub Pages Not Deploying

**Symptoms**: Workflow succeeds but site doesn't appear

**Solutions**:
1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` or `main` → `/ (root)`
   - Save

2. **Enable GitHub Actions**:
   - Settings → Actions → General
   - Workflow permissions: **Read and write permissions**
   - ✅ Allow GitHub Actions to create and approve pull requests
   - Save

3. **Check Permissions**:
   - Settings → Actions → General → Workflow permissions
   - Must be set to "Read and write permissions"

### 4. 404 Errors on GitHub Pages

**Symptoms**: Site loads but shows 404 for routes

**Solutions**:
- Verify `basePath` in `next.config.mjs` matches your repository name
- Check that `trailingSlash: true` is set
- Ensure `REPO_NAME` constant matches your actual repository name

### 5. Assets Not Loading

**Symptoms**: Images, CSS, or JS files return 404

**Solutions**:
- Verify `assetPrefix` matches `basePath`
- Check that `images.unoptimized: true` is set
- Ensure all asset paths are relative

### 6. Build Fails with TypeScript Errors

**Symptoms**: TypeScript compilation errors

**Solutions**:
- Run `npm run lint` locally to find errors
- Fix TypeScript errors before pushing
- Check `tsconfig.json` configuration

### 7. Workflow Permission Errors

**Symptoms**: "Permission denied" or "403" errors

**Solutions**:
- Go to Settings → Actions → General
- Under "Workflow permissions", select "Read and write permissions"
- Save changes
- Re-run the workflow

## Debugging Steps

1. **Check Workflow Logs**:
   - Go to Actions tab in your repository
   - Click on the failed workflow
   - Expand each step to see detailed logs

2. **Test Build Locally**:
   ```bash
   npm install
   npm run build
   # Check if 'out' directory is created
   ls -la out/
   ```

3. **Verify Configuration**:
   - Check `next.config.mjs` has `output: 'export'`
   - Verify `basePath` matches repository name
   - Ensure `NODE_ENV=production` in workflow

4. **Check Repository Settings**:
   - Settings → Pages → Source is set correctly
   - Settings → Actions → Permissions are enabled

## Getting Help

If issues persist:
1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review [Next.js static export docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
3. Check workflow logs for specific error messages

