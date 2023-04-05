import type { Response } from 'express';

export const handleServerError = (res: Response, error: unknown) => {
	console.error(error);
	res.status(500).json({ message: 'Something went wrong!' });
};