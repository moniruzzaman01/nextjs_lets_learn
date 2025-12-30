/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.ibb.co/**"),
      new URL("https://i.ibb.co.com/**"),
    ],
  },
};

export default nextConfig;
