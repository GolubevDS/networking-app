import React             from 'react';
import { Link, NavLink } from 'react-router-dom';

import Calendar from '~Assets/Icon/Calendar.svg';
import Camera   from '~Assets/Icon/Camera.svg';
import Contacts from '~Assets/Icon/Contacts.svg';
import Logo     from '~Assets/Icon/Logo.svg';
import Settings from '~Assets/Icon/Settings.svg';

import styles from './SideBar.module.scss';

export const SideBar = () => {
	return (
		<div className={styles.root}>
			<Logo className={styles.logo} />
			<nav>
				<ul>
					<li>
						<NavLink
							to="/contacts"
							className={({ isActive }) =>
								`${styles.link} ${isActive && styles.linkActive}`
							}
						>
							<Contacts />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="room"
							className={({ isActive }) =>
								`${styles.link} ${isActive && styles.linkActive}`
							}
						>
							<Camera />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/schedule"
							className={({ isActive }) =>
								`${styles.link} ${isActive && styles.linkActive}`
							}
						>
							<Calendar />
						</NavLink>
					</li>
				</ul>
			</nav>
			<Link to="/settings">
				<Settings className={styles.settings} />
			</Link>
		</div>
	);
};
