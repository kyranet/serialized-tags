/* eslint-disable no-process-env, camelcase */
const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');

const filename = `serialized-tags.min.js`;

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		path: path.resolve('./webpack'),
		filename,
		library: 'SerializedTags',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{ test: /\.md$/, loader: 'ignore-loader' },
			{
				test: require.resolve('./package.json'),
				type: 'javascript/auto',
				use: {
					loader: 'json-filter-loader',
					options: {
						used: ['version', 'homepage']
					}
				}
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin({
				terserOptions: {
					mangle: { keep_fnames: true },
					compress: { keep_fnames: true },
					output: { comments: false }
				},
				parallel: true
			})
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
