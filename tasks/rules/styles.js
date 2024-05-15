const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const styleLoaders = {
		production: MiniCSSExtractPlugin.loader, // Save styles into files
		development: 'style-loader' // inject styles into DOM
		//development: MiniCSSExtractPlugin.loader
	};

	return {
		test: /\.scss$/,
		exclude: /node_modules/,
		use:
		[
			{
				loader: styleLoaders[env] // Creates style nodes from JS strings
			},
			{
				loader: 'css-loader' // Translates CSS into CommonJS
				//options: {
				//	sourceMap: true
				//}
			},
			{
				loader: 'postcss-loader', // More CSS Plugins
				options: {
					plugins: () => [require('autoprefixer')({
						'browsers': ['last 2 versions']
					})]
				}
			},
			{
				loader: 'sass-loader', // Compiles Sass to CSS, using Node Sass by default
				options: {
					//includePaths: ['absolute/path/a']
				}
			}
		]
	};
};
