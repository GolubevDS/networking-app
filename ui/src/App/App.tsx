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
			<Route path="/" element={<AppLayout />}>
				<Route path="contacts" element={<ContactsPage />} />
				<Route path="room" element={<RoomPage />} />
				<Route path="schedule" element={<SchedulePage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Routes>
	);
};
