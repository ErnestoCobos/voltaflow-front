/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
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

// Solo en desarrollo
if (process.env.NODE_ENV === 'development') {
    nextConfig.rewrites = async () => [
        {
            source: '/app/:path*',
            destination: '/app/:path*',
        },
        {
            source: '/www/:path*',
            destination: '/www/:path*',
        },
    ];
}

export default nextConfig;
