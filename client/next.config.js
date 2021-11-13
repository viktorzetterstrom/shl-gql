/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:4001/graphql"
        : "https://shl.zetterstrom.dev/api",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/standings",
        permanent: true,
      },
    ];
  },
};
