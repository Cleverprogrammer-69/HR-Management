/** @type {import('next').NextConfig} */
// require('dotenv').config({ path: './.env' });
const nextConfig = {
  env: {
    HR_API_V1: 'http://localhost:4000/api/v1',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
