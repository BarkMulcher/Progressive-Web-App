const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// [x] TODO: Add and configure workbox plugins for a service worker and manifest file.
// [x] TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATR'
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATER",
        description: "This application installs JATE",
        background_color: 'blue',
        theme_color: 'gray',
        start_url: '/',
        publicPath: '/'
      }),

      new InjectManifest(),
      new WebpackPwaManifest({
        
          "short_name": "Manifest",
          "name": "TODOs Manifest Example",
          "icons": [
            {
              "src": "./favicon.ico",
              "type": "image/png",
              "sizes": "96x96",
              "purpose": "any maskable"
            }
          ],
          "orientation": "portrait",
          "display": "standalone",
          "start_url": "./",
          "description": "Keep track of important tasks!",
          "background_color": "#7eb4e2",
          "theme_color": "#7eb4e2"
        
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
