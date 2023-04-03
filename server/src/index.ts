import * as http from 'node:http';
import cors      from 'cors';
import dotenv    from 'dotenv';
import express   from 'express';

dotenv.config();

const
	app = express(),
	port = process.env.PORT || '5001',
	server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
