import type { NextFunction, Request, Response } from 'express';
import * as jwt                                 from 'jsonwebtoken';
import { DecodedUser }                          from '../interfaces';

import { handleServerError } from '../utils/contants';

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = () => async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bearerToken = req.headers['authorization'];

		if (!bearerToken) {
			return res.status(403).json({ message: 'No token provided!' });
		}

		const [_, token] = bearerToken.split(' ');

		if (!jwtSecret) {
			return res.status(500).json({ message: 'Could not found App secret!' });
		}

		await jwt.verify(token, jwtSecret, (error, decodedUser) => {
			if (error) {
				return res.status(403).json({ message: 'Invalid token!' });
			}

			req.user = decodedUser as DecodedUser;
			next();
		});
	} catch (error) {
		return handleServerError(res, error);
	}
};