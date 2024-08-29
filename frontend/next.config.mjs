/** @type {import('next').NextConfig} */
// require('dotenv').config({ path: './.env' });
const nextConfig = {
  env: {
    HR_API_V1: 'https://hr-management-server.onrender.com',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
