const webpack = require('webpack')

module.exports = {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
  optimization: { minimize: false }
}