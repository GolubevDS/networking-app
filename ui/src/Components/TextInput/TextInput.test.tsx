import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React                 from 'react';

import { Search } from '~Assets/Icons';

import { TextInput } from './TextInput';

describe('TextInput', () => {
	test('renders correctly', () => {
		const { container } = render(
			<TextInput
				clearable
				Icon={Search}
				placeholder="Search here..."
				value="Hello, world!"
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	test('allows users to enter text', () => {
		const { getByPlaceholderText } = render(<TextInput placeholder="Search here..." />);
		const input = getByPlaceholderText('Search here...') as HTMLInputElement;

		fireEvent.change(input, { target: { value: 'Hello, world!' } });
		expect(input.value).toBe('Hello, world!');
	});

	test('displays an icon if provided', () => {
		const { getByTestId } = render(<TextInput Icon={Search} />);
		const icon = getByTestId('icon');

		expect(icon).toBeInTheDocument();
	});

	test('does not display an icon if not provided', () => {
		const { queryByTestId } = render(<TextInput />);
		const icon = queryByTestId('icon');

		expect(icon).not.toBeInTheDocument();
	});

	test('clears the input when the clear button is clicked', () => {
		const { getByPlaceholderText, getByTestId } = render(<TextInput clearable placeholder="Search here..." />);
		const input = getByPlaceholderText('Search here...') as HTMLInputElement;

		fireEvent.change(input, { target: { value: 'Hello, world!' } });
		expect(input.value).toBe('Hello, world!');

		const clearButton = getByTestId('clear-button');

		fireEvent.click(clearButton);
		expect(input.value).toBe('');
	});
});
