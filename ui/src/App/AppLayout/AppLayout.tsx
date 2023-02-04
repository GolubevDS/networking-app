import React      from 'react';
import { Outlet } from 'react-router-dom';

import { Header }        from '~Components/Header';
import { SideBar }       from '~Components/SideBar';
import { ThemeProvider } from '~Shared/Theme/ThemeProvider';
import { useTheme }      from '~Shared/Theme/useTheme';

import styles from './AppLayout.module.scss';

export const AppLayout = () => {
	const { theme } = useTheme();

	return (
		<ThemeProvider>
			<div className={`app ${theme} ${styles.root}`}>
				<SideBar />
				<div className={styles.content}>
					<Header />
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
};
