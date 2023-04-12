import * as http  from 'node:http';
import cors       from 'cors';
import dotenv     from 'dotenv';
import express    from 'express';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

import WebSocket          from './controllers/socket';
import authRoutes         from './routes/auth';
import conversationRoutes from './routes/conversation';
import contactRoutes      from './routes/contact';

dotenv.config();

const
	app = express(),
	port = process.env.PORT || '5001',
	server = http.createServer(app),
	prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', [authRoutes, contactRoutes, conversationRoutes]);

const io = new Server(server, {
	cors: {
		credentials: true,
		origin: 'http://127.0.0.1:3000',
	},
});

io.on('connection', (socket) => {
	const
		webSocket = new WebSocket(socket, prisma),
		id = socket.handshake.query.userId;

	webSocket.connection();

	socket.on('login', () => webSocket.login());
	socket.on('logout', () => webSocket.logout());
	socket.on('message', () => webSocket.message());
	socket.on('disconnect', () => webSocket.disconnect());
	socket.on('conversationChange', () => webSocket.conversationChange());
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
