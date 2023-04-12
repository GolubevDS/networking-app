import type { PrismaClient }      from '@prisma/client';
import type { Request, Response } from 'express';

import { handleServerError } from '../utils/contants';
import { isIdExists }        from '../utils/isIdExists';

interface ContactData {
	userId: number;
	username: string;
	photo: string;
	conversationId: number;
}

class ContactController {
	constructor(private prisma: PrismaClient) {
	}

	private async newContact(data: ContactData, res: Response) {
		try {
			return await this.prisma.contact.create({ data });
		} catch (error) {
			return handleServerError(res, error);
		}
	}

	private async newConversation(participants: number[], res: Response) {
		try {
			return await this.prisma.conversation.create({ data: { participants } });
		} catch (error) {
			return handleServerError(res, error);
		}
	}

	async getContacts(req: Request, res: Response) {
		try {
			const id = req.user?.id;

			if (!isIdExists(id)) {
				return res.status(400).json({ message: 'Invalid user ID provided!' });
			}

			const contacts = await this.prisma.contact.findMany({
				where: { userId: id },
				orderBy: { createdAt: 'asc' },
			});

			return res.status(200).json({ contacts });
		} catch (error) {
			return handleServerError(res, error);
		}
	}

	async createContact(req: Request, res: Response) {
		try {
			const id = req.user?.id;

			if (!isIdExists(id)) {
				return res.status(400).json({ message: 'Invalid user ID provided!' });
			}

			const
				username: string = req.body.username,
				relatedUser = await this.prisma.user.findUnique({ where: { username } });

			if (!relatedUser) {
				return res.status(400).json({ message: 'Could not found related contact!' });
			} else if (relatedUser.id === id) {
				return res.status(400).json({ message: 'Could add yourself as a contact!' });
			}

			const isContactExists = await this.prisma.contact.findFirst({ where: { userId: id, username } });

			if (isContactExists) {
				return res.status(400).json({ message: 'Contact already exists!' });
			}

			const foundConversation = await this.prisma.conversation.findFirst({
				where: { participants: { hasEvery: [id, relatedUser.id] } },
			});

			if (foundConversation) {
				const contact = await this.newContact({
					username,
					userId: id,
					photo: relatedUser.photo,
					conversationId: foundConversation.id,
				}, res);

				return res.status(201).json({ message: 'New contact created!', contact });
			}

			const conversation = await this.newConversation([id, relatedUser.id], res);

			if (conversation) {
				const contact = await this.newContact({
					username,
					userId: id,
					photo: relatedUser.photo,
					conversationId: conversation.id,
				}, res);

				return res.status(201).json({ message: 'New contact created!', contact });
			}
		} catch (error) {
			return handleServerError(res, error);
		}
	}
}

export default ContactController;