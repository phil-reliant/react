// Product Listing (3-up) as found in 'Also Purchased' section of product detail page
import React from "react";
import { Link } from 'react-router-dom';
import { MakeRelativePath } from '../../utils/UrlUtils';
import RightArrow from '../../assets/svgs/right-arrow';

const ProductListing = (props) => {
	const { crossSell } = props;
	const items = crossSell.edges;

	const renderedItems = items.map((item, index) => {
		return (
			<Link key={`product_${index}`} to={`${MakeRelativePath(item.node.link)}`}>
				<div className={`product-listing__item-container__item`}>
					<img src={item.node.image ? item.node.image.mediaItemUrl : ''}
						alt={item.node.image ? item.node.image.altText : ''} />
					<p>{item.node.name}</p>
					<RightArrow />
				</div>
			</Link>
		)
	})

	return (
		(items && items.length > 0) ?
			<div className={`product-listing`}>
				<h6 className="h7">Also Purchased</h6>
				<div className={`product-listing__item-container`}>
					{renderedItems}
				</div>
			</div>
			:
			<></>
	);
};

export default ProductListing;
