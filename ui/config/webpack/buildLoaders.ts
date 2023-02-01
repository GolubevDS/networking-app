import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { RuleSetRule } from 'webpack';

export function buildLoaders(isDev: boolean): RuleSetRule[] {
	const typescriptLoader = {
		test:    /\.tsx?$/i,
		use:     'ts-loader',
		exclude: /node_modules/,
	};

	const cssLoader = {
		test: /\.css$/,
		use:  [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader:  'css-loader',
				options: {
					modules: {
						auto:           (resPath: string) => Boolean(resPath.includes('.module.')),
						localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
					},
				},
			},
		],
	};

	const svgLoader = {
		test:   /\.svg$/i,
		issuer: /\.tsx?$/i,
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
