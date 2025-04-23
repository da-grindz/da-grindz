/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:
      process.env.VERCEL_ENV === 'production'
        ? 'https://da-grindz.vercel.app'
        : process.env.VERCEL_ENV === 'preview'
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000',
  },
};

export default nextConfig;