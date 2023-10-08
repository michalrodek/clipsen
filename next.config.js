/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "clips-media-assets2.twitch.tv",
      },
    ],
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "2mb",
  },
  trailingSlash: true,
};

module.exports = nextConfig;
