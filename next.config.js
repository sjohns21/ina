// @ts-check

/**
 * @type {import("next").NextConfig}
 **/
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/virtual_conversation",
        destination: "/virtual-conversation",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
