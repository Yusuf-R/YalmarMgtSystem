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
    async headers() {
        return [
            {
                source: '/fonts/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
        ]
    }
};

export default nextConfig;
