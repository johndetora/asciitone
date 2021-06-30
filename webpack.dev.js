const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dev'),
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'src/themes', to: 'themes' }],
            patterns: [{ from: 'src/styles', to: 'styles' }],
            patterns: [{ from: 'src/scripts', to: 'js' }],
        }),
    ],
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
