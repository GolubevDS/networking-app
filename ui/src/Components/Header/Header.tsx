import React from 'react';

import { Search }    from '~Assets/Icons';
import { TextInput } from '~Components/TextInput';

import styles from './Header.module.css';

/** Header element. */
export const Header = (): JSX.Element => {
	return (
		<div className={styles.root}>
			<TextInput clearable Icon={Search} placeholder="Поиск..." />
		</div>
	);
};
