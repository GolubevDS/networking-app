import type { PrismaClient } from '@prisma/client';
import type { Socket }       from 'socket.io';

const onlineUser = new Map();

class WebSocket {
	constructor(private socket: Socket, private prisma: PrismaClient) {
	}

	connection() {
	}

	disconnect() {
	}

	login() {
	}

	logout() {
	}

	async message() {
	}

	async conversationChange() {
	}
}

export default WebSocket;