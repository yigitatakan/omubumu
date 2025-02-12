import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://would-you-rather-tr.vercel.app' : '',
  webpack: (config, { isServer }: WebpackConfigContext) => {
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
