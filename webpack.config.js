const path = require('path');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');
const rules = require('require.all')('./tasks/rules');
const TerserPlugin = require("terser-webpack-plugin");
const plugins = require('require.all')('./tasks/plugins');
const safePostCssParser = require('postcss-safe-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = env => {
	let environment = env.NODE_ENV;
	env.NODE_ENV = JSON.stringify(environment);

	rules((name, rule) => rule(environment));
	plugins((name, rule) => rule(environment));

	return ({
		mode: environment,
		entry: {
			app: [
				path.resolve(__dirname, 'app/scripts/app.js'),
				path.resolve(__dirname, 'app/styles/app.scss')
			]
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[name].chunk.js',
		},
		module: {
			rules: [
				...rules.files,
				rules.scripts,
				rules.styles
			]
		},
		plugins: [
			plugins.html,
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'website-disclaimer.html',
				template: './app/website-disclaimer.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'privacy-policy.html',
				template: './app/privacy-policy.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'cookies-policy.html',
				template: './app/cookies-policy.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'kraal.html',
				template: './app/kraal.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'case-studies/bali/index.html',
				template: './app/case-study-bali.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'case-studies/han/index.html',
				template: './app/case-study-sb-han.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'case-studies/flp/index.html',
				template: './app/case-study-sb-flexible-life-plan.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			new HtmlWebpackPlugin({
				hash: true,
				filename: 'case-studies/sb-ee/index.html',
				template: './app/case-study-sb-employee-experiences.html',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
			plugins.distBuild,
			plugins.distClean,
			plugins.extractStyles,
			/** /
			new CompressionPlugin({
				algorithm: 'gzip',
				compressionOptions: { level: 9 },
				filename: '[path].gz[query]',
				minRatio: 0.8,
				test: /\.(js|css|html|svg)$/,
			}),
			new CompressionPlugin({
				algorithm: 'brotliCompress',
				compressionOptions: { level: 11 },
				filename: '[path].br[query]',
				minRatio: 0.8,
				test: /\.(js|css|html|svg)$/,
			}),
			/**/
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				//TweenMax: 'TweenMax',
				//'window.TweenMax': 'TweenMax',
			}),
			new ZipPlugin({
				filename: 'lobengula-website.zip'
			})
		],
		devServer: {
			open: false,
			port: 5002,
			compress: true,
			https: {
				key: '../../conf/crt/cloud5ive/localhost.key',
				cert: '../../conf/crt/cloud5ive/localhost.crt'
			},
			hot: true,
			historyApiFallback: true,
			watchOptions: {
				poll: true
			}
			// proxy: { '/api': 'http://localhost:3000' }
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						parse: {
							ecma: 8
						},
						compress: {
							comparisons: false,
							ecma: 5,
							inline: 2
						},
						mangle: {
							safari10: true
						},
						output: {
							ascii_only: true,
							comments: false,
							ecma: 5
						}
					}
				}),
				new OptimizeCSSAssetsPlugin({
					cssProcessorOptions: {
						parser: safePostCssParser,
						map: false,
					},
					cssProcessorPluginOptions: {
						preset: [
							'default',
							{
							  discardComments: {
								removeAll: true,
							  },
							  minifyFontValues: {
								removeQuotes: false,
							  }
							}
						]
					},
				}),
			],
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'all',
						test: path.resolve(__dirname, 'node_modules'),
						name: 'vendor',
						enforce: true
					}
				}
			}
		},
		resolve: {
			alias: {
				'styles': path.resolve(__dirname, 'app/styles'),
				'assets': path.resolve(__dirname, 'app/assets'),
				'scripts': path.resolve(__dirname, 'app/scripts'),
				'~': path.resolve(__dirname, 'node_modules'),
			}
		}
	});
};
