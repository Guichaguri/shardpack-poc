// @ts-check
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const externalHost = 'localhost';

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'demo-host',
          filename: 'static/chunks/remoteEntry.js',
          dts: false,
          remotes: {
            'demo-mfe-nav': `demo-mfe-nav@http://${externalHost}:3002/_next/static/chunks/remoteEntry.js`,
            'demo-mfe-product': `demo-mfe-product@http://${externalHost}:3003/_next/static/chunks/remoteEntry.js`,
          },
          shared: {},
          extraOptions: {
            exposePages: false,
          },
        }),
      );
    }

    return config;
  },
};
