import type { Configuration } from 'webpack';

import { buildDevServer }    from './buildDevServer';
import { buildLoaders }      from './buildLoaders';
import { buildPlugins }      from './buildPlugins';
import { buildResolves }     from './buildResolves';
import type { BuildOptions } from './types/config';

export function buildWebpackConfig({ alias, mode, paths, isDev, port }: BuildOptions): Configuration {
	return {
		mode,
		devtool:   isDev ? 'inline-source-map' : undefined,
		entry:     paths.entry,
		output:    {
			path:     paths.build,
			filename: '[name].[contenthash].js',
			clean:    true,
		},
		devServer: buildDevServer(paths, port),
		resolve:   buildResolves(alias),
		module:    {
			rules: buildLoaders(isDev),
		},
		plugins:   buildPlugins(paths),
	};
}
