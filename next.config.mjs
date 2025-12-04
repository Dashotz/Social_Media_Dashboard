/** @type {import('next').NextConfig} */
// IMPORTANT: Update this to match your GitHub repository name
// Example: If your repo is 'my-dashboard', change 'social-media-dashboard' to 'my-dashboard'
const REPO_NAME = 'social-media-dashboard';
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
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}` : '',
};

export default nextConfig;

