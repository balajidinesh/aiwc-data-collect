/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Set Cache-Control header to no-store only for the default path
                source: '/',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig
