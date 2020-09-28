import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useLocation, Redirect } from "react-router-dom";
import gql from 'graphql-tag';
import LeadGenFormAndPanel from '../LeadGenFormAndPanel';
import Header from "../Header";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary";
import Footer from '../Footer';
import SEO from '../../components/SEO';
import PhoneSlideOutButton from '../../components/LeadGenFormAndPanel/PhoneSlideOutButton';				


const Layout = (props) => {
	const mainMenuLocationID = 'MENU_1'; // what wordpress menu to query for for the main menu

	const { children } = props;
	const { allowLeadGen } = props;
	const { seoProps = {}, pageTitle, ogType } = props;
	const { pathname } = useLocation();

	if( pageTitle ){
		seoProps.title = pageTitle;
	}

	if( ogType ){
		seoProps.opengraphType = ogType;
	}

	const MENUS_QUERY = gql`
		query MENUS_QUERY($mainMenulocation: MenuLocationEnum!) {
			redirection: getRedirect( uri: "${window.location.pathname}")
			mainMenu: menus(where: {location: $mainMenulocation}) {
				nodes {
					menuItems {
						nodes {
							target
							title
							url
							label
							cssClasses
							childItems {
								edges {
									node {
										target
										title
										url
										label
										cssClasses
									}
								}
							}
						}
					}
				}
			}

			footerPrimaryMenu: menus(where: {location: FOOTER_PRIMARY}) {
				nodes {
					menuItems {
						nodes {
							label
							url
							target
						}
					}
				}
			}
			footerSecondaryMenu: menus(where: {location: FOOTER_SECONDARY}) {
				nodes {
					menuItems {
						nodes {
							label
							url
							target
						}
					}
				}
			}

		}
	`;

	// query menu data
	let menuResponse = useQuery(MENUS_QUERY, {
		variables: { mainMenulocation:mainMenuLocationID }
	});
	if (menuResponse.loading) {
	}
	if (menuResponse.error) {
		console.error('Layout failed to load menus!');
	}

	// scroll to the top if the pathname changes (does not include if a query on the path changes (ex: changing search criteria on product search))
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			{
				Object.keys(seoProps).length > 0 ?
					<SEO {...seoProps} />
					:
					null
			}

			<ErrorBoundary>
				<div className="--mobile-only">
					<Header
						menuQueryLoading={false}
						menuQueryError={menuResponse.error}
						menus={menuResponse.data && menuResponse.data.mainMenu ? menuResponse.data.mainMenu : null}
						isMobile={true} />
				</div>
				<div className="--desktop-only">
					<Header
						menuQueryLoading={false}
						menuQueryError={menuResponse.error}
						menus={menuResponse.data && menuResponse.data.mainMenu  ? menuResponse.data.mainMenu : null}
						isMobile={false} />
				</div>
			</ErrorBoundary>
			<div className={`app-container`}>
				<main>{children}
			</main>
			{/* <div id="scripts" className="link-button button-dropshadow" >
					<img src="https://cms.reliant-technology.com/wp-content/uploads/2020/05/Chat-Bot-Icon.png" alt="" />
				</div> */}
					
			</div>
			{ (allowLeadGen === false) ?
				<>
				<div className="phoneExtra">
					<PhoneSlideOutButton />
				</div>
			</>
				:
				<ErrorBoundary>
					<LeadGenFormAndPanel {...props} />	
				</ErrorBoundary>
			}
			<ErrorBoundary>
				<Footer
					loading={false}
					primaryMenu={menuResponse.data && menuResponse.data.footerPrimaryMenu ? menuResponse.data.footerPrimaryMenu : null}
					secondaryMenu={menuResponse.data && menuResponse.data.footerSecondaryMenu ? menuResponse.data.footerSecondaryMenu : null} />
			</ErrorBoundary>
			<ErrorBoundary>
				{ menuResponse.data && menuResponse.data.redirection ?
					<Redirect to={menuResponse.data.redirection} state={{ status: 301 }} />
					:
					<></>
				}
			</ErrorBoundary>
			
		</>
		
	)
	
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  slug: PropTypes.string,
  avoidAutoScrollToTop : PropTypes.bool
};

export default Layout;
