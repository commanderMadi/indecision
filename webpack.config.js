const path = require('path');

module.exports = env => {
    return {
        mode: 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
    
                {   use: ['style-loader', 'css-loader', 'sass-loader'],
                    test:/\.s?css$/
                }
            ]
        },
        devtool: env === 'production' ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            publicPath: '/dist/',
            historyApiFallback: true
        }
    }
}