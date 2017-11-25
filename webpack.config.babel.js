import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

function resolve(p) {
  return path.join(__dirname, p);
}

const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [];

plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}));

if (!isDevelopment) {
  plugins.push(new UglifyJsPlugin());
  plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
  }));
}

export default {
  entry: resolve('src/main.coffee'),
  output: {
    path: resolve('docs'),
    filename: `[name]${(!isDevelopment ? '.[hash]' : '')}.js`,
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [{
          loader: 'coffee-loader',
          options: {
            transpile: {
              presets: ['env'],
            },
          },
        }],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  plugins,
};
