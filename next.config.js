/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
   devIndicators: false, 
}
module.exports = nextConfig;