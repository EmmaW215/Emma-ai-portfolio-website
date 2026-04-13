/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
}

export default nextConfig
