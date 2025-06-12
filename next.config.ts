import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

// const nextConfig: NextConfig = {
//   /* config options here */
// };
const nextConfig: import('next').NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}



export default nextConfig;
