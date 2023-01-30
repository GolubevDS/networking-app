import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { RuleSetRule } from 'webpack';

export function buildLoaders(isDev: boolean): RuleSetRule[] {
	const typescriptLoader = {
		test:    /\.tsx?$/i,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const cssLoader = {
		test: /\.css$/,
		use:  [
			isDev
				? 'style-loader'
				: MiniCssExtractPlugin.loader,
			'css-loader',
		],
	};

	const svgLoader = {
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
	};

	return [
		typescriptLoader,
		cssLoader,
		svgLoader,
	];
}
