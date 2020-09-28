import React from 'react';
import NavMenu from './NavMenu';
import ErrorBoundary from '../ErrorBoundary';
import SiteSearch from '../SiteSearch';

const NavMenuContainer = ({ menuQueryLoading, menuQueryError, menus, menuToggled, isMobile, doToggleMenuIfMobile }) => {

	const renderMenu = (menuState, menuData) => {
		let navMenuMarkup = ``;

		if (menuState === `loading`) {
			navMenuMarkup = <div></div>;
		} else {
			navMenuMarkup = <NavMenu {...menuData} doToggleMenuIfMobile={doToggleMenuIfMobile} />
		}

		return (
			<nav className={
					`site-header__nav
					container-fluid
					${menuToggled ? `active` : ``}`
				}
			>
				<ErrorBoundary>
					{navMenuMarkup}
				</ErrorBoundary>
				<ErrorBoundary>
					<SiteSearch
						location={`header`}
						isMobile={isMobile}
						doToggleMenuIfMobile={doToggleMenuIfMobile} />
				</ErrorBoundary>
			</nav>
		)

	}

	if (menuQueryLoading) return renderMenu(`loading`);
	// if (menuQueryError) return <p>ERROR loading menu</p>;
	if (!menus) return <></>;

	return renderMenu(`done`, menus.nodes[0]);
}

export default NavMenuContainer;
