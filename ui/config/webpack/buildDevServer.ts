import type { Configuration as DevConfiguration } from 'webpack-dev-server';

import type { BuildPaths } from './types/config';

export function buildDevServer(paths: BuildPaths, port: number): DevConfiguration {
	return {
		port,
		open:               true,
		static:             paths.build,
		historyApiFallback: true,
	};
}
