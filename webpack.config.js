const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/src/index.js',
    output: {
        path: path.resolve(__dirname, '/public/build'),
        filename: 'effects.js',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss'],
    },
};
