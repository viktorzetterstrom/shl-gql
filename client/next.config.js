/** @type {import('next').NextConfig} */

const ACTIVE_SEASON = "2021";

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${ACTIVE_SEASON}/standings`,
        permanent: false,
      },
      {
        source: "/standings",
        destination: `/${ACTIVE_SEASON}/standings`,
        permanent: false,
      },
      {
        source: "/games",
        destination: `/${ACTIVE_SEASON}/games`,
        permanent: false,
      },
      {
        source: "/goalies",
        destination: `/${ACTIVE_SEASON}/goalies`,
        permanent: false,
      },
      {
        source: "/skaters",
        destination: `/${ACTIVE_SEASON}/skaters`,
        permanent: false,
      },
    ];
  },
};
