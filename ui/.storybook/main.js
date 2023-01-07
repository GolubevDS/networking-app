const storybookConfig = {
	stories:   [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(ts|tsx)',
	],
	addons:    [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'./addons/webpack-config-presets.js',
	],
	framework: '@storybook/react',
	core:      {
		builder: '@storybook/builder-webpack5',
	},
};

module.exports = storybookConfig;
