const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  // no entry
  entry: {},
  mode: "development",
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 1339,
  },
  output: {
	  
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
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
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "store",
      filename: "remoteEntry.js",
      exposes: {
        "./Store": "./app",
      },
      shared: [
        {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true },
          mobx: { eager: true },
          "mobx-react": { eager: true },
        },
      ],
    })
  ],
};