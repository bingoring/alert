const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: 'production',
    externals: [nodeExternals({
        modulesDir: './node_modules'
    })],
    externalsPresets: {
        node: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_fnames: /AbortSignal/,
                    keep_classnames: true
                },
            }),
        ],
    },
    resolve: {
        modules: [
            'node_modules',
            './node_modules'
        ],
        extensions: ['.ts', '...'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.base.json" })],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    stats: {
        errorDetails: true
    },
    devtool: "source-map"
};
