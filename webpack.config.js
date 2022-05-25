
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: path.resolve(__dirname, "./src/script.js"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        clean: true
      },
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        compress: true,
         port: 3000,
        //watchContentBase: true,
        // progress: true,
        client: {
          overlay: {
            errors: true,
            warnings: false,
          }
        },
        // clientLogLevel: 'info',
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
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         "style-loader",
            //         {
            //             loader: "css-loader",
            //             options: { 
            //                 modules: {
            //                     mode: "local",
            //                     auto: true,
            //                     exportGlobals: true,
            //                     localIdentName: "[name]__[local]--[hash:base64:5]",
            //                 } 
            //             }
            //         }

            //     ]
            // },
            {
                test: /\.s[sc]ss$/i,
                use: [
                  { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
                  { loader: "css-loader", options: { modules: {
                    mode: "local",
                    auto: true,
                    exportGlobals: true,
                    localIdentName: "[name]__[local]",
                  } } },
                  { loader: "sass-loader" }
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