const path = require( 'path' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const packageJson = require( './package.json' );
const manifestJson = require( './manifest.json' );

if ( packageJson.version !== manifestJson.version ) {
  throw new Error(
      `TNDR \'version\' property in package.json differs from \'version\' property in manifest.json` );
}

const DONATE_LINK = 'https://my.qiwi.com/form/Evgenyi-DWBD4xB1bB';
const VERSION = packageJson.version;
const COMMON_CONFIG = {
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new CleanWebpackPlugin( {
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: false,
    } ),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = [
  // ==== EXTENSION CONFIG ====
  {
    ...COMMON_CONFIG,
    entry: {
      content: './src/content/swiping.js',
      popup: './src/popup.js',
      background: './src/background.js',
    },
    output: {
      path: path.resolve( __dirname, 'build', 'extension' ),
      filename: 'tndr.[name].js',
    },
    plugins: [
      ...COMMON_CONFIG.plugins,
      new HtmlWebpackPlugin( {
        minify: true,
        template: 'templates/popup.html',
        filename: 'popup.html',
        inject: false,
        templateParameters: {
          version: VERSION,
          donateLink: DONATE_LINK,
          scriptName: 'popup',
        },
      } ),
      new CopyPlugin( {
        patterns: [
          {
            from: 'assets/icons',
            to: 'icons',
          },
          {
            from: 'manifest.json',
            to: 'manifest.json',
          },
        ],
      } ),
    ],
  },
  // ==== SITE CONFIG ====
  {
    ...COMMON_CONFIG,
    entry: {
      site: './src/site.js',
    },
    output: {
      path: path.resolve( __dirname, 'build', 'site' ),
      filename: 'tndr.[name].js',
    },
    plugins: [
      ...COMMON_CONFIG.plugins,
      new HtmlWebpackPlugin( {
        minify: true,
        template: 'templates/site.html',
        filename: 'index.html',
        inject: false,
        templateParameters: {
          version: VERSION,
          donateLink: DONATE_LINK,
        },
      } ),
      new CopyPlugin( {
        patterns: [
          {
            from: 'assets/images',
            to: 'images',
          },
          {
            from: 'assets/icons/tinder32.png',
            to: '.'
          }
        ],
      } ),
    ],
  },
];