import { AuthResponse, User }  from '@/interfaces';
import { getLocalStorageItem } from '@/utils/localStorage';
import { create }              from 'zustand';
import { immer }               from 'zustand/middleware/immer';

interface AuthContext {
	user: User | null;
	isAuthenticated: boolean;
	jwt: string | null;
	login: (response: AuthResponse) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthContext>()(
	immer((set) => ({
		user: getLocalStorageItem('user') ?? null,
		isAuthenticated: getLocalStorageItem('isAuthenticated') ?? false,
		jwt: getLocalStorageItem('jwt') ?? null,
		login: ({ user, jwt }: AuthResponse) =>
			set((state) => {
				state.jwt = jwt;
				state.user = user;
				state.isAuthenticated = true;
			}),
		logout: () =>
			set((state) => {
				state.jwt = null;
				state.user = null;
				state.isAuthenticated = false;
			}),
	})),
);