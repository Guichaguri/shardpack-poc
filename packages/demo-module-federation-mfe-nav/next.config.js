const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'demo-mfe-nav',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './Header': './src/components/Header',
          './Footer': './src/components/Footer',
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
