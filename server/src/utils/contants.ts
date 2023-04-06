import type { Response } from 'express';

export const handleServerError = (res: Response, error: unknown) => {
	console.error(error);
	const message = error instanceof Error ? error.message : 'Something went wrong!';
	res.status(500).json({ message });
};