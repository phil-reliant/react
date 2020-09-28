import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { InternalOrExternalLink } from '../../utils/UrlUtils';

// There are two footer menus, the secondary one includes less important items (ex: Terms & Conditions, Privacy Policy)
const FooterMenuSecondary = ({ menuDetails }) => {
	return (
		<ErrorBoundary message={`Unable to load footer menu`}>
			<section className={`footer-menu secondary`}>
				<nav>
					{
						menuDetails ?
							menuDetails.nodes[0].menuItems.nodes.map((item, index) => (
								<div key={index} className={`menu-item`}>
									<InternalOrExternalLink url={item.url} target={item.target}>{item.label}</InternalOrExternalLink>
								</div>
							))
							:
							<>Error</>
					}
				</nav>
			</section>
		</ErrorBoundary>
	);
}

export default FooterMenuSecondary;
