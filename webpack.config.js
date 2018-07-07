const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


module.exports = {
    entry: './website/static/app/main.js',
    output: {
        path: path.resolve(__dirname, 'website/static/dist'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8000/'
        },
        {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: true
        })
    ]
};
