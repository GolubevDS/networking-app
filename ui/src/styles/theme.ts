import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
	palette: {
		background: {
			main: '#525561',
			dark: '#272A37',
			light: '#323644',
		},
		primary: {
			main: '#1D90F5',
			light: '#58AEF9',
			dark: '#0082F4',
		},
		gray: {
			main: '#555B69',
		},
		error: '#C62828',
		success: '#00897B',
		text: '#F7F7F7',
		warning: '#303F9F',
	},
	breakpoints: {
		mobile: '600px',
	},
};