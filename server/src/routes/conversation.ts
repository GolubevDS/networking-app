import { PrismaClient } from '@prisma/client';
import express          from 'express';

import ConversationController   from '../controllers/conversation';
import { validate }             from '../middlewares/validate';
import { verifyToken }          from '../middlewares/verifyToken';
import { createMessageRequest } from '../validators/conversation';

const
	router = express.Router(),
	prisma = new PrismaClient(),
	conversationController = new ConversationController(prisma),
	BASE_URL = '/conversation';

router.get(`${BASE_URL}/:id`, verifyToken(), (req, res) => conversationController.getConversation(req, res));
router.post(`${BASE_URL}`, validate(createMessageRequest), verifyToken(), (req, res) =>
	conversationController.createMessage(req, res)
);

export default router;