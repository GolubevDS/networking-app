import { PrismaClient } from '@prisma/client';
import express          from 'express';

import AuthController  from '../controllers/auth';
import { validate }    from '../middlewares/validate';
import { authRequest } from '../validators/auth';

const
	router = express.Router(),
	prisma = new PrismaClient(),
	authController = new AuthController(prisma);

const BASE_URL = '/auth';

router.post(`${BASE_URL}/login`, validate(authRequest), (req, res) => authController.login(req, res));
router.post(`${BASE_URL}/register`, validate(authRequest), (req, res) => authController.register(req, res));
router.get(`${BASE_URL}/logout`, (req, res) => authController.logout(req, res));

export default router;