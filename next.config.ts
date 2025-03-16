import { NextConfig } from 'next';

const config: NextConfig = {
  /* config options here */
  experimental: {
    // см. [250317002609]
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default config;
