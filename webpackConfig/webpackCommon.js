const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' },
			{
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/txtrs'
          }
        }]
      },
      { 
        test: /\.(obj|glb|gltf|FBX|bin)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: ''
          }
        }]
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" } },
          'css-loader'
        ]
      },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
            template: './public/index.html'
		}),
		new webpack.ProvidePlugin({
			THREE: 'three',
            'GLOBAL': '',
		}),
        new CopyPlugin({
            patterns: [
                { from: "public/draco", to: "draco" },
                // "path/to/source", // absolute or relative, files/directories/globs - see below for examples
            ],
            options: {
                concurrency: 100,
            },
        }),
	]
};