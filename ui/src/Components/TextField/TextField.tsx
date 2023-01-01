import React from 'react';

import styles from './TextField.module.css';

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
	icon?: React.ReactElement;
}

export const TextField = ({ placeholder, icon }: TextFieldProps) => {
	return (
		<label className={styles.root}>
			{icon}
			<input
				className={styles.textField}
				type="text"
				placeholder={placeholder || ''}
			/>
		</label>
	);
};
