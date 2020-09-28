import React, { useState, useRef, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MakeRelativePath, InternalOrExternalLink } from '../../utils/UrlUtils';
import gsap from 'gsap';
import RightArrow from '../../assets/svgs/right-arrow.js';
import PlusSign from '../../assets/svgs/plus-sign.js';

const NavMenu = ({ menuItems, doToggleMenuIfMobile}) => {
	const [ activeMenu, setActiveMenu ] = useState(null);
	const menuRef = useRef([...Array(menuItems.nodes.length)].map(() => createRef()));
	const containerRef = useRef(null);

	useEffect(() => {
		gsap.to(containerRef.current, { duration: 1, opacity: 1 })
	});

	if (!menuItems.nodes.length) return ``;

	const RenderSubMenu = (menuItems, isActive, menuIndex) => {
		if (!menuItems.edges.length) return ``;

		const { edges } = menuItems;
		const activeClass = isActive ? `active` : ``;

		const subMenuMarkup = edges.map(({node}, index) => {
			const classes = node.cssClasses.join(" ");
			const target = node.target || `_self`;

			return (
				<li
					key={`submenu-item-${index}`}
					className={
						`submenu__item
						${classes}`
					}
				>
					<InternalOrExternalLink url={node.url} target={target} onClick={() => doToggleMenuIfMobile()}>
						<span>{node.label}</span>
						<RightArrow />
					</InternalOrExternalLink>
				</li>
			)
		});

		return (
			<ul
				ref={menuRef.current[menuIndex]}
				className={`submenu ${activeClass}`}
			>
				{subMenuMarkup}
			</ul>
		)
	}

	const listItems = menuItems.nodes.map((item, index) => {
		const classes = item.cssClasses.join(" ");
		const target = item.target || `_self`;
		const hasChildren = !!item.childItems.edges.length;

		const isActive = activeMenu === index;
		const subMenu = RenderSubMenu(item.childItems, isActive, index);
		const childrenClass = item.childItems.edges.length ? `--has-children` : ``;

		const onSubClick = () => {
			if (!isActive) {
				if (activeMenu !== null) {
					gsap.to(menuRef.current[activeMenu].current, { duration: 0.25, height: 0 });
				}

				setActiveMenu(index);
				gsap.to(menuRef.current[index].current, { duration: 0.25, height: `auto` });
			} else {
				setActiveMenu(null);
				gsap.to(menuRef.current[index].current, { duration: 0.25, height: 0 });
			}
		}

		const currPageClass = MakeRelativePath(item.url) === `${window.location.pathname}/` ? `--active` : ``;

		return (
			<li
				key={`nav-menu-item-${index}`}
				className={`nav-menu__item
					${childrenClass}
					nav-menu__item--${item.menuItemId}
					${classes}
					${currPageClass}
					${activeMenu === index ? `--open` : ``}
				`}
			>
				{
					hasChildren ?
					<button
						onClick={(ev) => {
							if (window.innerWidth < 992) {
								onSubClick();
							} else {
								ev.preventDefault();
							}
						}}>
						<span>{item.label}</span>
						<PlusSign />
					</button>
					:
					<InternalOrExternalLink
						url={item.url}
						target={target}
						onClick={() => doToggleMenuIfMobile()}
					>
						{item.label}
					</InternalOrExternalLink>
				}
				{subMenu}
			</li>
		);
	});

	return listItems.length ?
		<ul
			ref={containerRef}
			className={`site-header__nav-menu`}
		>
			{listItems}
		</ul>
		:
		``;
};

NavMenu.propTypes = {
	menuItems: PropTypes.object,
	doToggleMenuIfMobile: PropTypes.func.isRequired
}

export default NavMenu;
