const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (entry, public) => ({
  mode: "development",
  entry: [
    entry,
    require.resolve("webpack-hot-middleware/client") + "?reload=true"
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: public,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules\/(?!(miles-prototype)\/).*/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")],
            plugins: [
              // https://github.com/webpack/webpack/issues/4039
              [
                require.resolve("@babel/plugin-transform-modules-commonjs"),
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
        use: [require.resolve("style-loader"), require.resolve("css-loader")]
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
