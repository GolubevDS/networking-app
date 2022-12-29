import React                     from 'react';
import { NavLink } from 'react-router-dom';

import Calendar from '~Assets/Icon/Calendar.svg';
import Camera   from '~Assets/Icon/Camera.svg';
import Contacts from '~Assets/Icon/Contacts.svg';
import Logo     from '~Assets/Icon/Logo.svg';
import Settings from '~Assets/Icon/Settings.svg';

import styles from './SideBar.module.css';

export const SideBar = () => {
	return (
		<div className={styles.root}>
			<Logo className={styles.logo} />
			<nav>
				<ul>
					<li>
						<NavLink
							to="/contacts"
							className={
								({ isActive }) => isActive ? styles.linkActive : styles.link
							}
						>
							<Contacts />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="room"
							className={
								({ isActive }) => isActive ? styles.linkActive : styles.link
							}
						>
							<Camera />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/schedule"
							className={
								({ isActive }) => isActive ? styles.linkActive : styles.link
							}
						>
							<Calendar />
						</NavLink>
					</li>
				</ul>
			</nav>
			<NavLink
				to="/settings"
				className={
					({ isActive }) => isActive ? styles.linkActive : styles.link
				}
			>
				<Settings />
			</NavLink>
		</div>
	);
};
