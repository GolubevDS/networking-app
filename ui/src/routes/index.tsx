import { lazy, Suspense }                                 from 'react';
import { BrowserRouter, Navigate, Outlet, Routes, Route } from 'react-router-dom';

import Styles from '@/styles';

const App = lazy(() => import('@/pages/App'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const Loading = lazy(() => import('@/pages/Loading'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const Router = () => {
	const
		isAuthenticated = false,
		PublicRoutes = () => (!isAuthenticated ? <Outlet /> : <Navigate to="/" />),
		PrivateRoutes = () => (isAuthenticated ? <Outlet /> : <Navigate to="/login" />);

	return (
		<BrowserRouter>
			<Styles isModalOpen={false} />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<PublicRoutes />}>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Route>

					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<App />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};