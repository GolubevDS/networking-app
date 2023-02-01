import type { ResolveOptions } from 'webpack';

import type { BuildAlias } from './types/config';

export function buildResolves(alias: BuildAlias): ResolveOptions {
	return {
		alias,
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	};
}
