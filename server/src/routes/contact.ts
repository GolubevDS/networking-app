import { PrismaClient } from '@prisma/client';
import express          from 'express';

import ContactController from '../controllers/contact';
import { verifyToken }   from '../middlewares/verifyToken';

const
	router = express.Router(),
	prisma = new PrismaClient(),
	contactController = new ContactController(prisma),
	BASE_URL = '/contact';

router.get(BASE_URL, verifyToken(), (req, res) => contactController.getContacts(req, res));
router.post(BASE_URL, verifyToken(), (req, res) => contactController.createContact(req, res));

export default router;