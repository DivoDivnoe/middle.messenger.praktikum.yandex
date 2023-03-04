const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyCssWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const stylesHandler = MiniCssExtractPlugin.loader;

const isProduction = process.env.NODE_ENV == 'production';

const optimization = () => {
  const config = {
    minimizer: [new MinifyCssWebpackPlugin()],
  };

  if (isProduction) {
    config.minimizer = [...config.minimizer, new TerserWebpackPlugin()];
  }

  return config;
};

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
      watch: true,
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    open: true,
  },
  devtool: isProduction ? false : 'inline-source-map',
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '...'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
