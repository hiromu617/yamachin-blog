/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"],
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
};
