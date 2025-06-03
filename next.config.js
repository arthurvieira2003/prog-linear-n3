/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: [
      "api.sofascore.app",
      "logodetimes.com",
      "countryflagsapi.com",
      "flagcdn.com",
      "api.crunchyleague.com",
      "cdn.sofifa.net",
      "upload.wikimedia.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sofascore.app",
        port: "",
        pathname: "/api/v1/team/**",
      },
      {
        protocol: "https",
        hostname: "logodetimes.com",
        port: "",
        pathname: "/times/**",
      },
      {
        protocol: "https",
        hostname: "countryflagsapi.com",
        port: "",
        pathname: "/png/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w160/**",
      },
      {
        protocol: "https",
        hostname: "api.crunchyleague.com",
        port: "",
        pathname: "/assets/images/shields/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sofifa.net",
        port: "",
        pathname: "/teams/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };

    return config;
  },
};

module.exports = nextConfig;
