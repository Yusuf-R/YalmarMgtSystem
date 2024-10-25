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
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
            },
        ],
    },
    // Update headers for local font files
    async headers() {
        return [
            {
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;