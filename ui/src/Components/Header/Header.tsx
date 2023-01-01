import React from 'react';

import Search        from '~Assets/Icon/Search.svg';
import { TextField } from '~Components/TextField';

import styles from './Header.module.css';

export const Header = () => {
	return (
		<div className={styles.root}>
			<TextField icon={<Search />} placeholder="Поиск..." />
		</div>
	);
};
