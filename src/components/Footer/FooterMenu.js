import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { InternalOrExternalLink } from '../../utils/UrlUtils';

const FooterMenu = ({ menuDetails }) => {
	return (
		<ErrorBoundary message={`Unable to load footer menu`}>
			<section className={`footer-menu primary`}>
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

export default FooterMenu;
