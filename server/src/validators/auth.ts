import * as yup from 'yup';

export const authRequest = yup.object({
	username: yup
		.string()
		.min(2, 'Username is too short!')
		.max(18, 'Username is too long!')
		.required(),
	password: yup
		.string()
		.min(6, 'Password is too short!')
		.max(32, 'Password is too long!')
		.required(),
});