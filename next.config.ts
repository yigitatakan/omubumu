import type { Configuration } from 'webpack'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://would-you-rather-tr.vercel.app' : '',
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
          path: false,
        }
      }
    }
    return config
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  }
}

export default nextConfig
