export interface User {
	id: number;
	username: string;
	photo: string;
}

export interface AuthResponse {
	user: User;
	jwt: string;
}