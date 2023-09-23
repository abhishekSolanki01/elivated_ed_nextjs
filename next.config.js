/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  }, 
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}
module.exports = {
  nextConfig,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}
