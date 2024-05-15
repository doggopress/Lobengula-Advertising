const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	const defaultConfig = new HtmlWebpackPlugin({
		hash: true,
		filename: 'index.html',
		template: './app/index.html',
		minify: {
			collapseWhitespace: true,
        	removeComments: true,
			useShortDoctype: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true,
		}
	});

	const plugin = {
		production: defaultConfig,
		development: defaultConfig
	};

	return plugin[env];
};
