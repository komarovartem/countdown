const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client/resources/index.js',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client/assets')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
