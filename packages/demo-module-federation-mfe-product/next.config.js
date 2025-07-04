// @ts-check
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'demo-mfe-product',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './Product': './src/components/Product',
        },
        remotes: {},
        shared: {},
        extraOptions: {
          exposePages: false,
        },
      }),
    );

    return config;
  },
};
