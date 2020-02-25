const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const development = require('./development');
const config = require('./config');

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = merge.smart(development, {
  output: {
    path: path.join(config.path.output, 'electron-js')
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      'BUILD_DOWNLOADABLE': 'true',
      'BUILD_ELECTRON': 'true',
      ETHERSCAN_API_KEY
    })
  ]
});
