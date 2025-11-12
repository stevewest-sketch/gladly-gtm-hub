import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      // CoE Section
      {
        source: '/bva',
        destination: '/coe/bva',
      },

      // Enablement Section
      {
        source: '/demo',
        destination: '/enablement/demo',
      },
      {
        source: '/demo/:path*',
        destination: '/enablement/demo/:path*',
      },
      {
        source: '/training',
        destination: '/enablement/training',
      },
      {
        source: '/e-learning',
        destination: '/enablement/e-learning',
      },
      {
        source: '/e-learning/:slug',
        destination: '/enablement/e-learning/:slug',
      },

      // Products Section
      {
        source: '/sidekick-standalone',
        destination: '/product/sidekick-standalone',
      },
      {
        source: '/sidekick-voice',
        destination: '/product/sidekick-voice',
      },
      {
        source: '/sidekick-email',
        destination: '/product/sidekick-email',
      },
      {
        source: '/sidekick-sales',
        destination: '/product/sidekick-sales',
      },
      {
        source: '/guides-and-journeys',
        destination: '/product/guides-and-journeys',
      },
      {
        source: '/guides-and-journeys/:path*',
        destination: '/product/guides-and-journeys/:path*',
      },
      {
        source: '/app-platform',
        destination: '/product/app-platform',
      },
      {
        source: '/customer-ai',
        destination: '/product/customer-ai',
      },

      // Role Kits Section (maps to enablement/toolkits)
      {
        source: '/role-kits/sales',
        destination: '/enablement/toolkits/sales',
      },
      {
        source: '/role-kits/csm',
        destination: '/enablement/toolkits/csm',
      },
      {
        source: '/role-kits/sc',
        destination: '/enablement/toolkits/success',
      },
      {
        source: '/role-kits/marketing',
        destination: '/enablement/toolkits/marketing',
      },
      {
        source: '/role-kits/bdrs',
        destination: '/enablement/toolkits/bdrs',
      },
      {
        source: '/role-kits/implementation',
        destination: '/enablement/toolkits/implementation',
      },

      // Content Section rewrites
      {
        source: '/resources/competitive',
        destination: '/enablement/competitive',
      },
      {
        source: '/resources/playbooks',
        destination: '/enablement/playbooks',
      },
    ];
  },
};

export default nextConfig;
