const path = require( 'path' );

module.exports = {
  entry: {
    content: './src/content/swiping.js',
    popup: './src/popup.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'tndr.[name].js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve( __dirname, 'postcss.config.js' ),
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
};