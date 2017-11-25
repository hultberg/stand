import path from 'path';
import webpack from 'webpack';

function resolve(p) {
  return path.join(__dirname, '../', p);
}

export default {
  entry: resolve('src/main.coffee'),
  output: {
    path: resolve('dist'),
    filename: '[name].js',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
};
