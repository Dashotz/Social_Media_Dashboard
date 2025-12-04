/** @type {import('next').NextConfig} */
// IMPORTANT: Update this to match your GitHub repository name
// Example: If your repo is 'my-dashboard', change 'social-media-dashboard' to 'my-dashboard'
// Or leave as 'social-media-dashboard' if that's your repo name
const REPO_NAME = process.env.GITHUB_REPOSITORY 
  ? process.env.GITHUB_REPOSITORY.split('/')[1] 
  : 'social-media-dashboard';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  trailingSlash: true,
  // For GitHub Pages: use repository name as basePath
  // This is automatically detected from GITHUB_REPOSITORY env var in CI
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}` : '',
};

export default nextConfig;

