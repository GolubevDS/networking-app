import type { ComponentMeta } from '@storybook/react';
import React                  from 'react';

import * as icons from '~Assets/Icons';

import { TextInput }           from './TextInput';
import type { TextInputProps } from './types';

export default {
	title:     'Text input',
	component: TextInput,
	argTypes:  {
		Icon: {
			options: Object.keys(icons),
			mapping: icons,
			control: {
				defaultValue: null,
				description:  'Icon',
				type:         'select',
				labels:       Object.keys(icons),
			},
		},
	},
} as ComponentMeta<typeof TextInput>;

export const Default = (args: TextInputProps) => <TextInput {...args} />;
