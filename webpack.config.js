const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'styles/[name]-[contenthash].css' }),

        new HtmlWebpackPlugin({
            template: './src/template.html',
            minify: false,
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/themes', to: 'themes' }],
        }),
    ],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'assets',
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets',
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', //2. Turns css into commonjs
                ],
            },
        ],
    },
};
