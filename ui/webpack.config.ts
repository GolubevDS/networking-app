import * as path                                 from 'node:path';
import type { Configuration }                    from 'webpack';
import { buildWebpackConfig }                    from './config/webpack/buildWebpackConfig';
import type { BuildAlias, BuildEnv, BuildPaths } from './config/webpack/types/config';

function webpackConfig(env: BuildEnv): Configuration {
	const alias: BuildAlias = {
		'~App':        path.resolve(__dirname, 'src', 'App'),
		'~Assets':     path.resolve(__dirname, 'src', 'Assets'),
		'~Components': path.resolve(__dirname, 'src', 'Components'),
		'~Pages':      path.resolve(__dirname, 'src', 'Pages'),
	};

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html:  path.resolve(__dirname, 'public', 'index.html'),
	};

	const
		mode = env.mode || 'development',
		port = env.port || 3000,
		isDev = mode === 'development';

	return buildWebpackConfig({
		alias,
		mode,
		paths,
		port,
		isDev,
	});
}

export default webpackConfig;
