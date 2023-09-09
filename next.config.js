/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'itupqbpaascvmjpxfzvl.supabase.co'
    ]
  }
};

module.exports = nextConfig;
