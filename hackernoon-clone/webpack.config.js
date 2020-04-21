// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    // where to start the bundling process
    entry: './app/index.js',
    // tell webpack where to put the output files
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index_bundle.js",
        publicPath: '/',
    },
    module: {
        rules: [
            // tells babel to run on all .js files
            { test: /\.(js)$/, use: 'babel-loader' },
            // for loading css files and handling style tags
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ]
    },
    // tells how to build React...minified for production or with all the extra errors/warnings for development
    mode: 'development',
    plugins: [
        // this will automatically generate our new index.html with the bundles included as a script
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        // this will simply copy over the '_redirects' file, which tells Netlify to redirect all of the domain's URL paths to index.html
        new CopyPlugin([
            { from: '_redirects'}
        ])
    ],
    // for rendering 404 error with react router
    devServer: {
        historyApiFallback: true
    }
}