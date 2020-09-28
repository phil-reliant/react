import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ReliantLogo from "../../assets/svgs/reliant-logo";
import NavMenuContainer from './NavMenuContainer.js';

const Header = ({ menuQueryLoading, menuQueryError, menus, isMobile }) => {
	const [ menuToggled, setMenuToggled ] = useState(false);

	const onToggleClick = () => {
		doToggleMenuIfMobile();
	}

	const doToggleMenuIfMobile = () => {
		if (isMobile) {
			document.querySelector('body').classList.toggle('nav-open');
			document.querySelector('.app-container').classList.toggle('nav-open');
			setMenuToggled(!menuToggled);
		}
	}

	return (
		<header className={`site-header`}>
			<div className={`site-header__inner container-fluid`}>
				<div className={`site-header__nav-container`}>
					<div
						className={
							`site-header__nav-toggle
							${menuToggled ? `toggled` : ``}`
						}
						onClick={onToggleClick}
					>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<NavMenuContainer
						menuQueryLoading={menuQueryLoading}
						menuQueryError={menuQueryError}
						menus={menus}
						menuToggled={menuToggled}
						isMobile={isMobile}
						doToggleMenuIfMobile={doToggleMenuIfMobile} />
				</div>
				<div className={`site-header__logo-container logo`}>
					<Link to={`/`}>
						<ReliantLogo />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
