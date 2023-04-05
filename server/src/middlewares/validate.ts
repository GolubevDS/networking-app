import type { NextFunction, Request, Response } from 'express';
import { ValidationError }                      from 'yup';
import type { ObjectSchema }                    from 'yup';

import { handleServerError } from '../utils/contants';

export const validate = (schema: ObjectSchema<Record<string, unknown>>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.body);
			return next();
		} catch (error) {
			if (error instanceof ValidationError) {
				return res.status(400).json({ message: error.message });
			} else {
				handleServerError(res, error);
			}
		}
	};