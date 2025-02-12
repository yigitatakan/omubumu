import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://would-you-rather-tr.vercel.app' : '',
  basePath: '',
  output: 'standalone',
}

export default nextConfig
