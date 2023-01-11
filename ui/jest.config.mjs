export default {
	preset:                     'ts-jest',
	testMatch:                  ['**/src/**/*.test.{ts,tsx}'],
	testEnvironment:            'jsdom',
	moduleNameMapper:           {
		'~Assets/Icons(.*)$': '<rootDir>/src/Assets/Icons/$1',
		'\\.svg':             '<rootDir>/src/Shared/Mocks/Svg.tsx',
		'\\.css$':            'identity-obj-proxy',
	},
};
