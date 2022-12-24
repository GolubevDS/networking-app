import * as path              from 'node:path';
import { fileURLToPath }      from 'node:url';
import HtmlWebpackPlugin      from 'html-webpack-plugin';
import ESLintWebpackPlugin    from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const
	__filename = fileURLToPath(import.meta.url),
	__dirname  = path.dirname(__filename);

export default (env, argv) => {
	const
		mode    = argv.mode || 'production',
		devtool = mode === 'production' ? undefined : 'source-map';

	return {
		mode,
		devtool,
		entry: './src/index.tsx',
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: 'bundle.js',
			libraryTarget: 'umd',
			clean: true,
		},
		devServer: {
			port: 3000,
			open: true,
			hot: true,
			static: path.resolve(__dirname, './dist'),
		},
		resolve: {
			alias: {
				'~Bootstrap': path.resolve(__dirname, 'src/Bootstrap'),
			},
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/i,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
						},
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Networking app',
				template: './src/index.html',
			}),
			new CleanWebpackPlugin(),
			new ESLintWebpackPlugin({
				extensions: ['js', 'jsx', 'ts', 'tsx'],
			}),
		],
	};
}
