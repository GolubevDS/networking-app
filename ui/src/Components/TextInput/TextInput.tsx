import React, { useState }  from 'react';
import type { ChangeEvent } from 'react';

import { Close } from '~Assets/Icons';

import styles                  from './TextInput.module.css';
import type { TextInputProps } from './types';

/**
 * TextInput allows users to enter text into an input field.
 *
 * @param {TextInputProps} props - The props for the TextInput component.
 * @returns {JSX.Element} The TextInput JSX element.
 */
export const TextInput = ({
	clearable,
	placeholder = '',
	Icon,
}: TextInputProps): JSX.Element => {
	const [value, setValue] = useState('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
	};

	const handleClearInput = () => {
		setValue('');
	};

	return (
		<div className={styles.root}>
			<label className={styles.label}>
				{Icon ? <Icon /> : null}
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
					onClick={handleClearInput}
				/>
			) : null}
		</div>
	);
};
