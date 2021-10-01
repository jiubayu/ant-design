const path = require('path');
// 样式单独抽取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 当前命令所在的目录
const cwd = process.cwd();
module.exports = {
    mode: 'development',
    devtool: false, // 关闭生成sourceMap
    entry: {
        antd: './index.js',
    },
    output: {
        path: path.resolve('dist'), // 输出到dist目录
        filename: '[name].js', // 打包后的文件名 antd.js
        library: 'ant',
        libraryTarget: 'umd' // umd 统一模块定义 支持amd|cmd|commonjs|commonjs2|window
    },
    externals: { //  组件库代码是不需要打包react和react-dom进去的
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDom',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module:{
        rules:[
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader, // 把这些css收集起来变成 antd.css
                    {
                        loader: 'css-loader', // 处理@import和url
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader', // 加厂商前缀
                        options:{
                            postcssOptions:{
                                plugins: ['autoprefixer']
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer'],
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            { // 在webapck5里file-loader和url-loader已经废弃了
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                type: 'asset' // 内置支持
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}