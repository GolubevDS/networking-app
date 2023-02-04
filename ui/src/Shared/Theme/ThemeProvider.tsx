import React, { useState }        from 'react';
import type { PropsWithChildren } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Themes, ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.DARK;
	const [theme, setTheme] = useState<Themes>(defaultTheme);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
