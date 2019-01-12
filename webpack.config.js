const path = require("path");

module.exports = {
  entry: ["whatwg-fetch", "./src/index.js"],
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  }
};
