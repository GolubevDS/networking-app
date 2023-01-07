import React             from 'react';
import { Route, Routes } from 'react-router-dom';

import { ContactsPage } from '~Pages/Contacts';
import { RoomPage }     from '~Pages/Room';
import { SchedulePage } from '~Pages/Schedule';
import { SettingsPage } from '~Pages/Settings';

import { AppLayout } from './AppLayout';
import './index.css';

export const App = () => {
	return (
		<Routes>
			<Route element={<AppLayout />} path="/">
				<Route element={<ContactsPage />} path="contacts" />
				<Route element={<RoomPage />} path="room" />
				<Route element={<SchedulePage />} path="schedule" />
				<Route element={<SettingsPage />} path="settings" />
			</Route>
		</Routes>
	);
};
