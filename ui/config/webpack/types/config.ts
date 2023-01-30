export type BuildMode = 'production' | 'development';

export interface BuildAlias {
	[key: string]: string;
}

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
}

export interface BuildEnv {
	mode: BuildMode;
	port: number;
}

export interface BuildOptions {
	alias: BuildAlias;
	paths: BuildPaths;
	mode: BuildMode;
	isDev: boolean;
	port: number;
}
