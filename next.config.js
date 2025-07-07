/** @type {import('next').NextConfig} */

// Import the Sentry webpack plugin
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // Production optimization
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },

  // Image optimization for evidence files
  images: {
    domains: [
      'png-police-cyber-evidence.s3.ap-southeast-2.amazonaws.com',
      'localhost',
      'res.cloudinary.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content Security Policy for PNG Police system
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.sentry-cdn.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://api.github.com https://policemanagementsystem.vercel.app https://*.sentry.io",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ],
      },
    ];
  },

  // API routes configuration
  async rewrites() {
    return [
      // PNG Police main system integration proxy
      {
        source: '/api/police-integration/:path*',
        destination: 'https://policemanagementsystem.vercel.app/api/:path*'
      }
    ];
  },

  // Environment variables for client-side
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    APP_NAME: process.env.APP_NAME || 'PNG Police Cyber Crime Monitoring',
    APP_VERSION: '1.0.0',
    NODE_ENV: process.env.NODE_ENV,
  },

  // Webpack configuration for production optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    };

    // Enable webpack bundle analyzer in development
    if (!dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_ID': JSON.stringify(buildId),
        })
      );
    }

    return config;
  },

  // Build configuration
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // Production performance optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Internationalization (if needed for PNG)
  i18n: {
    locales: ['en', 'tpi'], // English and Tok Pisin
    defaultLocale: 'en',
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Sentry configuration for production monitoring
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  
  // Upload source maps to Sentry
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring/tunnel',
  hideSourceMaps: true,
  disableLogger: true,
};

// Export configuration with Sentry integration
module.exports = process.env.NODE_ENV === 'production' 
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;