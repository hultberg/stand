import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import baseConfig from './webpack.base.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default WebpackMerge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    hot: true,
    compress: true,
    port: 8080,
    host: 'localhost',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // HMR shows correct file names in console on update.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
});
