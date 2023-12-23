/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "clips-media-assets2.twitch.tv",
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
