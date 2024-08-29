const path = require("path");

module.exports = {
  entry: {
    index: "./client.js",
  },
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, ".dist"),
  },
  devServer: {
    port: 8080,
    static: {
        serveIndex: true,
        directory: "."
    },
    proxy: [
      {
        context: ["/statusHub"],
        target: "http://localhost:5132",
        ws: true,
      },
    ],
  },
};
