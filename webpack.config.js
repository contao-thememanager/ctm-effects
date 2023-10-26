const path = require('path');

module.exports = {
    mode: 'production',
    entry: './assets/js/effects.js',
    output: {
        path: path.resolve(__dirname, '/public/assets/dist'),
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
