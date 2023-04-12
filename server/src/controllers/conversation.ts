import type { Conversation, PrismaClient } from '@prisma/client';
import type { Request, Response }          from 'express';
import { handleServerError }               from '../utils/contants';
import { isIdExists }                      from '../utils/isIdExists';

class ConversationController {
	constructor(private prisma: PrismaClient) {
	}

	async getConversation(req: Request, res: Response) {
		try {
			const id = req.user?.id;

			if (!isIdExists(id)) {
				return res.status(400).json({ message: 'Invalid user ID provided!' });
			}

			const conversationId = Number(req.params.id);

			if (Number.isNaN(conversationId)) {
				res.status(400).json({ message: 'Conversation ID is not number!' });
			}

			const conversation = await this.prisma.conversation.findUnique({
				include: { messages: { orderBy: { createdAt: 'asc' } } },
				where: {
					id: conversationId,
				},
			});

			if (!conversation) {
				return res.status(404).json({ message: 'Could not find the conversation!' });
			}

			if (!this.isMyConversation(id, conversation)) {
				return res.status(401).json({ message: 'No access to this conversation!' });
			}

			return res.status(200).json({ conversation });
		} catch (error) {
			return handleServerError(res, error);
		}
	}

	async createMessage(req: Request, res: Response) {
		try {
			const id = req.user?.id;

			if (!isIdExists(id)) {
				return res.status(400).json({ message: 'Invalid user ID provided!' });
			}

			const { text, conversationId }: { text: string, conversationId: number } = req.body;

			const conversation = await this.prisma.conversation.findUnique({
				where: {
					id: conversationId,
				},
			});

			if (!conversation) {
				return res.status(404).json({ message: 'Could not find the conversation!' });
			}

			if (!this.isMyConversation(id, conversation)) {
				return res.status(401).json({ message: 'No access to this conversation!' });
			}

			const newMessage = await this.prisma.message.create({
				data: {
					from: id,
					text,
					conversationId,
				},
			});

			return res.status(201).json({ message: newMessage });
		} catch (error) {
			return handleServerError(res, error);
		}
	}

	isMyConversation(id: number, conversation: Conversation) {
		return conversation.participants.includes(id);
	}
}

export default ConversationController;