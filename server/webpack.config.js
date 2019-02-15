const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (entry, public) => ({
  mode: "development",
  entry: [entry, "webpack-hot-middleware/client?reload=true"],
  devtool: "inline-source-map",
  devServer: {
    contentBase: public,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-react-app"],
            plugins: [
              // https://github.com/webpack/webpack/issues/4039
              [
                "@babel/plugin-transform-modules-commonjs",
                {
                  allowTopLevelThis: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(public, "index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "static/js/bundle.js",
    publicPath: "/"
  }
});
