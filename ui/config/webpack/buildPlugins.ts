import ESLintWebpackPlugin            from 'eslint-webpack-plugin';
import HtmlWebpackPlugin              from 'html-webpack-plugin';
import MiniCssExtractPlugin           from 'mini-css-extract-plugin';
import type { WebpackPluginInstance } from 'webpack';

import type { BuildPaths } from './types/config';

export function buildPlugins(paths: BuildPaths): WebpackPluginInstance[] {
	return [
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		new MiniCssExtractPlugin({
			filename:      'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new ESLintWebpackPlugin({
			extensions: ['tsx', 'ts', 'jsx', 'js'],
		}),
	];
}
