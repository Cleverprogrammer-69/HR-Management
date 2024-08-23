/** @type {import('next').NextConfig} */
// require('dotenv').config({ path: './.env' });
const nextConfig = {
  env: {
    HR_API_V1: 'http://localhost:4000/api/v1',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dj7xzuf0j/image/upload',
  },
};

export default nextConfig;
