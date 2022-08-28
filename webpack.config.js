const path = require( 'path' );

module.exports = {
  entry: {
    background: './src/content/index.js',
    popup: './src/popup/index.js'
  },
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'tndr.[name].js',
  },
  devtool: 'cheap-module-source-map'
};