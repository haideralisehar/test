/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tap.company https://goSellJSLib.b-cdn.net;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              connect-src 'self' https://*.tap.company;
              frame-src 'self' https://*.tap.company;
            `.replace(/\n/g, " "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
