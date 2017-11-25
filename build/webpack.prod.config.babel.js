import WebpackMerge from 'webpack-merge';
import baseConfig from './webpack.base.config.babel';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default WebpackMerge(baseConfig, {
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
});
