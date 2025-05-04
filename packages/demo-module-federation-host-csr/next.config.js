const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'demo-host',
          filename: 'static/chunks/remoteEntry.js',
          dts: false,
          remotes: {
            'demo-mfe-nav': `demo-mfe-nav@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
            'demo-mfe-product': `demo-mfe-product@http://localhost:3003/_next/static/chunks/remoteEntry.js`,
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
