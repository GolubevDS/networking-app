import type { PrismaClient }      from '@prisma/client';
import type { Request, Response } from 'express';
import * as bcrypt                from 'bcrypt';
import * as jwt                   from 'jsonwebtoken';

import { handleServerError } from '../utils/contants';

const jwtSecret = process.env.JWT_SECRET;

class AuthController {
	constructor(private prisma: PrismaClient) {
	}

	async login(req: Request, res: Response) {
		try {
			const
				{ username, password } = req.body,
				foundUser = await this.prisma.user.findUnique({ where: { username } });

			if (!foundUser) {
				return res.status(400).json({ message: 'Invalid credentials!' });
			}

			const validPassword = await this.comparePassword({
				password,
				hashedPassword: foundUser.password,
			});

			if (!validPassword) {
				return res.status(400).json({ message: 'Invalid credentials!' });
			}

			const
				token = await this.generateJWT({ id: foundUser.id, username: foundUser.username }),
				{ password: _, ...userWithoutPassword } = foundUser;

			return res.status(201).json({ user: userWithoutPassword, jwt: token });
		} catch (error) {
			handleServerError(res, error);
		}
	}

	async register(req: Request, res: Response) {
		try {
			const
				{ username, password } = req.body,
				userExists = await this.prisma.user.findUnique({ where: { username } });

			if (userExists) {
				return res.status(400).json({ message: 'User already exists!' });
			}

			const
				hashedPassword = await this.hashPassword(password),
				createdUser = await this.prisma.user.create({
					data: {
						username,
						password: hashedPassword,
						photo   : this.generateRandomAvatar(),
					},
				}),
				token = await this.generateJWT({ id: createdUser.id, username: createdUser.username }),
				{ password: _, ...userWithoutPassword } = createdUser;

			return res.status(201).json({ user: userWithoutPassword, jwt: token });
		} catch (error) {
			handleServerError(res, error);
		}
	}

	async logout(req: Request, res: Response) {
		try {
			return res.send(200).json({ message: 'Logged out' });
		} catch (error) {
			handleServerError(res, error);
		}
	}

	async hashPassword(password: string) {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	}

	async generateJWT(data: { id: number, username: string }) {
		return jwt.sign(data, jwtSecret!, { expiresIn: '86400s' });
	}

	async comparePassword({ password, hashedPassword }: { password: string, hashedPassword: string }) {
		return await bcrypt.compare(password, hashedPassword);
	}

	generateRandomAvatar() {
		const
			gender = Math.round(Math.random()) ? 'men' : 'women',
			imageNumber = Math.ceil(Math.random() * 98);

		return `https://randomuser.me/api/portraits/med/${gender}/${imageNumber.toString()}.jpg`;
	}
}

export default AuthController;