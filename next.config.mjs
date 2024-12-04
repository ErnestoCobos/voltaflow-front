/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/app/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'app.voltaflow.com',
                    },
                ],
            },
            {
                source: '/:path*',
                destination: '/www/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.voltaflow.com',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
