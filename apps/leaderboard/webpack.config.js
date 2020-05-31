/* eslint-disable @typescript-eslint/no-var-requires */

// @see ../../node_modules/@nrwl/react/plugins/webpack.js
// @see https://medium.com/@artempetrovcode/how-webpack-progressplugin-works-7e7301a3d919
// @see https://www.valentinog.com/blog/babel/
// @see https://www.freecodecamp.org/news/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75/
// @see https://www.robinwieruch.de/minimal-react-webpack-babel-setup
// @see https://www.toptal.com/react/webpack-react-tutorial-pt-1

'use strict'; // eslint-disable-line
Object.defineProperty(exports, '__esModule', { value: true });

const babelUtils = require('../../node_modules/@nrwl/react/src/utils/babel-utils');
const webpack = require('webpack'); // eslint-disable-line

// Add React-specific configuration
function getWebpackConfig(config) {
  const idx = config.module.rules.findIndex((r) => r.loader === 'babel-loader');
  const babelRuleOptions = config.module.rules[idx].options;
  babelUtils.updateBabelOptions(babelRuleOptions); // eslint-disable-line
  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif|webp)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.svg$/,
      oneOf: [
        // If coming from JS/TS file, then transform into React component using SVGR.
        {
          issuer: {
            test: /\.[jt]sx?$/,
          },
          use: [
            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '[name].[hash:7].[ext]',
              },
            },
          ],
        },
        // Fallback to plain URL loader.
        {
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '[name].[hash:7].[ext]',
              },
            },
          ],
        },
      ],
    }
  );
  config.plugins.push(new webpack.ProgressPlugin());
  return config;
}
module.exports = getWebpackConfig;
