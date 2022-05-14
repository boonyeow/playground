/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, //was true
    images: {
        formats: ["image/avif", "image/webp"],
    },
};

module.exports = nextConfig;
