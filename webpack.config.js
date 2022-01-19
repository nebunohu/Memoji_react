
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "./src/script.js"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "script.js",
        clean: true
      },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        stats: 'errors-only'
    },
    devtool: 'source-map',
    /*'babel': {
        'presets': [
            '@babel/env',
            '@babel/react'
        ]
    },*/

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }

                ]
            },
            {
                test: /\.s[ac]ss$/i,
                sideEffects: true,
                use: [ 
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 
                    /*{
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },*/
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        }
                    },
                ]   
            },
            {
                test: /\.(png|svg|jpg|gif|)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve(__dirname, "./src/index.pug")
        }),
    ],
    
}