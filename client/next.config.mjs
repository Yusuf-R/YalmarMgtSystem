/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
