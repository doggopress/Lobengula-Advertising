const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {

	const defaultConfig = new CopyPlugin(
		[
			{
				from: 'vendor',
				to: 'vendor'
			},
			{
				from: 'app/assets/images/favicons',
				to: ''
			},
			{
				from: 'app/contact.php',
				to: ''
			},
			{
				from: 'app/.htaccess',
				to: ''
			},
			{
				from: 'app/robots.txt',
				to: ''
			},
			{
				from: 'app/sitemap.xml',
				to: ''
			},
		],
		{
			ignore: [
				// Doesn't copy any files with a txt extension
				'*.bin',
				'*.DS_Store'
				// Doesn't copy any file, even if they start with a dot
				//'**/*',
				// Doesn't copy any file, except if they start with a dot
				//{ glob: '**/*', dot: false }
			],
			// By default, we only copy modified files during
			// a watch or webpack-dev-server build. Setting this
			// to `true` copies all files.
			copyUnmodified: true
		}
	);
	//const defaultConfig = [];

	const plugin = {
		production: defaultConfig
	};

	return plugin[env];
};
