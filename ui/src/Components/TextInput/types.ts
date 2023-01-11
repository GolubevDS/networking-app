import type { FC, SVGProps } from 'react';

/**
 * Props for the TextInput component.
 *
 * @typedef {object} TextInputProps
 * @property {boolean} [clearable=false] - Whether the input should have a clear button.
 * @property {React.FC<React.SVGProps<SVGElement>>} [Icon] - An optional icon to display in the input.
 * @property {string} [placeholder] - Placeholder text to display in the input.
 * @property {string} [value] - Initial value for the input
 */
export interface TextInputProps {
	clearable?: boolean;
	Icon?: FC<SVGProps<SVGElement>>;
	placeholder?: string;
	value?: string;
}
