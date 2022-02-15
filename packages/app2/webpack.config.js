const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  entry: "./index.js",
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 1338,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./Users": "./app",
      },
      shared: [
        {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true },
          mobx: { eager: true },
          "mobx-react": { eager: true },
          "@mfexample/store": { singleton: true, eager: true },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
