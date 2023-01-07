import * as path              from 'node:path';
import { fileURLToPath }      from 'node:url';
import HtmlWebpackPlugin      from 'html-webpack-plugin';
import ESLintWebpackPlugin    from 'eslint-webpack-plugin';
import MiniCssExtractPlugin   from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const
	__filename = fileURLToPath(import.meta.url),
	__dirname  = path.dirname(__filename);

export default (env, argv) => {
	const
		mode         = argv.mode || 'production',
		isProduction = (mode === 'production'),
		devtool      = isProduction ? undefined : 'source-map';

	return {
		mode,
		devtool,
		entry:     './src/index.tsx',
		output:    {
			path:          path.resolve(__dirname, './dist'),
			filename:      'bundle.js',
			libraryTarget: 'umd',
			clean:         true,
			publicPath:    '/',
		},
		devServer: {
			port:               'auto',
			open:               true,
			static:             path.resolve(__dirname, './dist'),
			historyApiFallback: true,
		},
		resolve:   {
			alias:      {
				'~App':        path.resolve(__dirname, 'src/App'),
				'~Assets':     path.resolve(__dirname, 'src/Assets'),
				'~Components': path.resolve(__dirname, 'src/Components'),
				'~Pages':      path.resolve(__dirname, 'src/Pages'),
			},
			extensions: ['.tsx', '.ts', '.jsx', '.js'],
		},
		module:    {
			rules: [
				{
					test:    /\.(ts|js)x?$/i,
					exclude: /node_modules/,
					use:     {
						loader:  'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							],
						},
					},
				},
				{
					test: /\.css$/,
					use:  [
						isProduction
							? MiniCssExtractPlugin.loader
							: 'style-loader',
						'css-loader',
					],
				},
				{
					test:   /\.svg$/i,
					issuer: /\.(ts|js)x?$/i,
					use:    [
						{
							loader:  '@svgr/webpack',
							options: {
								typescript: true,
								ext:        'tsx',
							},
						},
					],
				},
			],
		},
		plugins:   [
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin(),
			new ESLintWebpackPlugin({
				extensions: ['tsx', 'ts', 'jsx', 'js'],
			}),
		],
	};
}
