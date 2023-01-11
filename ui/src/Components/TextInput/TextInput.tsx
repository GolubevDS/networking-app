import React, { useState }  from 'react';
import type { ChangeEvent } from 'react';

import { Close } from '~Assets/Icons';

import styles                  from './TextInput.module.css';
import type { TextInputProps } from './types';

/** TextInput allows users to enter text into an input field. */
export const TextInput = ({
	clearable,
	Icon,
	placeholder = '',
	value: defaultValue = '',
}: TextInputProps): JSX.Element => {
	const [value, setValue] = useState(defaultValue);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
	};

	const handleClearInput = () => {
		setValue('');
	};

	return (
		<div className={styles.root}>
			<label className={styles.label}>
				{Icon ? <Icon data-testid="icon" /> : null}
				<input
					className={styles.textField}
					placeholder={placeholder}
					type="text"
					value={value}
					onChange={handleChange}
				/>
			</label>
			{clearable && value ? (
				<Close
					className={styles.clearInput}
					data-testid="clear-button"
					onClick={handleClearInput}
				/>
			) : null}
		</div>
	);
};
