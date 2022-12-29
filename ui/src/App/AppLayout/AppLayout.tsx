import React      from 'react';
import { Outlet } from 'react-router-dom';

import { Header }  from '~Components/Header';
import { SideBar } from '~Components/SideBar';

import styles from './AppLayout.module.css';

export const AppLayout = () => {
	return (
		<div className={styles.root}>
			<SideBar />
			<div className={styles.content}>
				<Header />
				<Outlet />
			</div>
		</div>
	);
};
