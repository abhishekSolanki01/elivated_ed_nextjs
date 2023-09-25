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

const rewrites = async() => {
  return [
    {
      source: '/api/:path*',
      destination: 'https://elivated-ed-nextjs.vercel.app/api/:path*',
    },
  ]
},
module.exports = {
  rewrites,
  nextConfig,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}
