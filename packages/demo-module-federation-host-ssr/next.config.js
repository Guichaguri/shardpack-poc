// @ts-check
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const internalHost = 'localhost';
const externalHost = 'localhost';

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, options) => {
    const location = options.isServer ? 'ssr' : 'chunks';
    const host = options.isServer ? internalHost : externalHost;

    config.plugins.push(
      new NextFederationPlugin({
        name: 'demo-host',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        remotes: {
          'demo-mfe-nav': `demo-mfe-nav@http://${host}:3002/_next/static/${location}/remoteEntry.js`,
          'demo-mfe-product': `demo-mfe-product@http://${host}:3003/_next/static/${location}/remoteEntry.js`,
        },
        shared: {},
        extraOptions: {
          exposePages: false,
        },
      }),
    );

    return config;
  },
};
