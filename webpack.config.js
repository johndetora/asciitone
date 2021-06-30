const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            minify: false,
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
                        outputPath: 'imgs',
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. Extract css into files
                    'css-loader', //2. Turns css into commonjs
                ],
            },
        ],
    },
};
