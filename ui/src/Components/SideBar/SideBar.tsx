import React       from 'react';
import { NavLink } from 'react-router-dom';

import {
	Calendar,
	Camera,
	Contacts,
	Logo,
	Settings,
} from '~Assets/Icons';

import styles from './SideBar.module.scss';

/**
 * @param {Object} params - The link's `isActive` state.
 * @return {string} The class name.
 */
const getLinkClassName = ({ isActive }: { isActive: boolean }): string => (
	isActive ? styles.linkActive : styles.link
);

/** SideBar element. */
export const SideBar = (): JSX.Element => {
	return (
		<div className={styles.root}>
			<Logo className={styles.logo} />
			<nav>
				<ul>
					<li>
						<NavLink
							className={getLinkClassName}
							to="/contacts"
						>
							<Contacts />
						</NavLink>
					</li>
					<li>
						<NavLink
							className={getLinkClassName}
							to="room"
						>
							<Camera />
						</NavLink>
					</li>
					<li>
						<NavLink
							className={getLinkClassName}
							to="/schedule"
						>
							<Calendar />
						</NavLink>
					</li>
				</ul>
			</nav>
			<NavLink
				className={getLinkClassName}
				to="/settings"
			>
				<Settings />
			</NavLink>
		</div>
	);
};
