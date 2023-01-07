const path = require('node:path');

module.exports = {
	webpackFinal: async (config, options) => {
		// Add support for alias
		config.resolve.alias = {
			...config?.resolve?.alias,
			'~Assets': path.resolve(__dirname, '../../src/Assets')
		};

		// Add support svg
		const fileLoaderRule = config.module.rules.find(
			(rule) => !Array.isArray(rule.test) && rule.test.test('.svg'),
		);
		fileLoaderRule.exclude = /\.svg$/;
		config.module.rules.push({
			test: /\.svg$/,
			use:  ['@svgr/webpack'],
		});

		// Add support styles
		config.module.rules = config.module.rules.filter(
			f => f.test.toString() !== '/\\.css$/',
		);
		config.module.rules.push({
			test:    /\.css$/,
			use:     [
				'style-loader', {
					loader:  'css-loader',
					options: {
						modules: true,
					},
				}],
			include: path.resolve(__dirname, '../../src'),
		});

		return config;
	},
};
