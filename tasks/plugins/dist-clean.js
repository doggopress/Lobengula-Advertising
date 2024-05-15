const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
	const defaultConfig = new CleanWebpackPlugin();

	const plugin = {
		production: defaultConfig
	};

	return plugin[env];
};
