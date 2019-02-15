const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.js", "webpack-hot-middleware/client?reload=true"],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
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
    new CleanWebpackPlugin(["../example/public"]),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: "static/js/bundle.js",
    publicPath: "/"
  }
};
