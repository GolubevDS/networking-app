import * as http  from 'node:http';
import cors       from 'cors';
import dotenv     from 'dotenv';
import express    from 'express';
import { Server } from 'socket.io';

import authRoutes    from './routes/auth';
import contactRoutes from './routes/contact';

dotenv.config();

const
	app = express(),
	port = process.env.PORT || '5001',
	server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', [authRoutes, contactRoutes]);

const io = new Server(server, {
	cors: {
		credentials: true,
		origin     : 'http://127.0.0.1:3000',
	},
});

io.on('connection', (socket) => {
	console.log(socket.id);
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
