const isProd = process.env.NODE_ENV === 'production';
const repo = 'react2025';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',               // 정적 내보내기 (out/)
  images: { unoptimized: true },  // next/image 사용할 때 필수
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,            // 경로 처리 안정화
  reactStrictMode: false,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
   devIndicators: false, 
}
module.exports = nextConfig;