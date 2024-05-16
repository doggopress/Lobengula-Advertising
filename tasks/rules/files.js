//const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => {
	return [

		{
			test: /\.(webm|mp4)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'videos',
						/**/
						attributes: {
							list: [
								// All default supported tags and attributes
								'...',
								{
									tag: 'video',
									attribute: 'data-src',
									type: 'src'
								},
								{
									tag: 'video',
									attribute: 'data-srcset',
									type: 'srcset'
								},
								{
									tag: 'source',
									attribute: 'data-srcset',
									type: 'srcset'
								}
							]
						}
						/**/
					}
				}
			]
		},
		{
			test: /\.(png|jpg|jpeg|gif)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'images',
						//attrs: [':srcset', ':data-srcset', 'img:data-src', 'img:src']
						/**/
						attributes: {
							list: [
								// All default supported tags and attributes
								'...',
								{
									tag: 'img',
									attribute: 'data-src',
									type: 'src'
								},
								{
									tag: 'img',
									attribute: 'data-srcset',
									type: 'srcset'
								},
								{
									tag: 'source',
									attribute: 'data-srcset',
									type: 'srcset'
								}
							]
						}
						/**/
					}
				}
			]
		},
		{
			test: /\.(json|lottie)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'lottie',
						attributes: {
							list: [
								// All default supported tags and attributes
								//'...',
								{
									tag: 'lottie-player',
									attribute: 'data-src',
									type: 'src'
								},
								{
									tag: 'lottie-player',
									attribute: 'src',
									type: 'src'
								},
							]
						}
						/**/
					}
				}
			]
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg|otf)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						outputPath: 'fonts'
					}
				}
			]
		},
		{
			test: /\.(html)$/,
			use: [
				{
					loader: 'html-loader',
					options: {
						//attrs: [':src'],
						//attrs: [':srcset',':data-srcset', 'img:data-src', 'img:src', 'audio:src', 'video:src', 'track:src', 'embed:src', 'source:src', 'input:src', 'object:data', 'script:src']
						//attrs: [':srcset', ':data-srcset', 'img:data-src', 'img:src'],
						/**/
						attributes: {
							list: [
								// All default supported tags and attributes
								'...',
								{
									tag: 'img',
									attribute: 'data-src',
									type: 'src'
								},
								{
									tag: 'div',
									attribute: 'data-src',
									type: 'src'
								},
								{
									tag: 'span',
									attribute: 'data-background',
									type: 'src'
								},
								{
									tag: 'img',
									attribute: 'data-srcset',
									type: 'srcset'
								},
								{
									tag: 'source',
									attribute: 'data-srcset',
									type: 'srcset'
								}
							]
						},
						/**/
						minimize: {
							removeComments: true,
							collapseWhitespace: true
						}
					}
				}
			]
		}
	];
};
