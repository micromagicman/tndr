const path = require( 'path' );

const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const packageJson = require( './package.json' );
const manifestJson = require( './manifest.json' );

if ( packageJson.version !== manifestJson.version ) {
    throw new Error( `TNDR \'version\' property in package.json differs from \'version\' property in manifest.json` );
}

const DONATE_LINK = 'https://my.qiwi.com/form/Evgenyi-DWBD4xB1bB';
const VERSION = packageJson.version;

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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin( {
            template: 'templates/popup.html',
            filename: 'popup.html',
            inject: false,
            templateParameters: {
                version: VERSION,
                donateLink: DONATE_LINK,
                scriptName: 'popup'
            }
        } )
    ]
};