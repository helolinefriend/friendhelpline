// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;




// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: '/api/livechat/:path*',
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'], // Add your image host domain here
  },
};

export default nextConfig;

  
  