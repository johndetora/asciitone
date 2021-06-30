const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },

    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
