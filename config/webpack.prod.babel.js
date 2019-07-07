// Important modules this config uses
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = require("./webpack.base.babel")({
  mode: "production",
  entry: [path.join(process.cwd(), "app/app.js")],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js"
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: "app/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new WebpackAssetsManifest({
      // Options go here
      templateParameters: { title: process.env.BRAND_HEADER_TEXT }
    }),
    new CopyPlugin([{ from: "app/_redirects" }])
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  }
});
