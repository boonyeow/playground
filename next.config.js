/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
    reactStrictMode: false, //was true
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["igo.gamestarter.com"],
    },
});

module.exports = nextConfig;
