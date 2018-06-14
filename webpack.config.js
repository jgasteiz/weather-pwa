var path = require('path');


module.exports = {
    entry: './website/static/js/main.js',
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
    devtool: 'source-map'
};
