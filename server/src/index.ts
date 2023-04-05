import * as http  from 'node:http';
import cors       from 'cors';
import dotenv     from 'dotenv';
import express    from 'express';
import { Server } from 'socket.io';

import authRoutes from './routes/auth';

dotenv.config();

const
	app = express(),
	port = process.env.PORT || '5001',
	server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', [authRoutes])

const io = new Server(server, {
	cors: {
		origin: 'http://127.0.0.1:3000',
		credentials: true
	}
})

io.on('connection', (socket) => {
	console.log(socket.id);
})

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
