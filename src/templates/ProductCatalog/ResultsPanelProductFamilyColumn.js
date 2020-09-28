import React from "react";
import { Link } from 'react-router-dom';
import { MakeRelativePath } from '../../utils/UrlUtils';
import RightArrow from '../../assets/svgs/right-arrow.js';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';

const ResultsPanelProductFamilyColumn = ({
	brandsData,
	selectedProductFamilyId
}) => {

	// console.log('brandsData', brandsData);

	const GetProductFamilyData = () => {
		for (let b in brandsData) {
			let brand = brandsData[b];
			for (let pt in brand.filteredProductCache) {
				let productType = brand.filteredProductCache[pt];
				if (productType.families && Object.keys(productType.families).length > 0) {
					if (selectedProductFamilyId in productType.families) {
						let familyData = productType.families[selectedProductFamilyId];
						return familyData;
					}
				}
			}
		}
	}

	const getFamilyLinkSection = (familyData) => {
		return (
			<div className={`results-panel__product-family-column__link-section`}>
				{ familyData &&
					familyData.linkFromHardwareCatalog &&
					familyData.linkFromHardwareCatalog.url ?
					<div className="buttons --align-left">
						<Link className="button --standard --allow-narrow arrow-icon"
							to={MakeRelativePath(familyData.linkFromHardwareCatalog.url)}>
							<span>Learn about {familyData.name}</span>
							<div className={`arrow-icon`}>
								<ArrowNoStem />
							</div>
						</Link>
					</div>
					:
					<></>
				}
				{ familyData.additional_links &&
					familyData.additional_links.length > 0 ?
					<div className="buttons --align-left">
						{
							familyData.additional_links.map((linkEntry, index) => (
								<Link key={`add-link-${index}`}
									className="button --standard --allow-narrow --black-border arrow-icon"
									target={linkEntry.target}
									to={MakeRelativePath(linkEntry.url)}>
									<span>{linkEntry.title}</span>
									<div className={`arrow-icon`}>
										<ArrowNoStem />
									</div>
								</Link>
							))
						}
					</div>
					:
					<></>
				}
			</div>
		)
	}

	// find the product family amongst all the brandsData
	const familyData = GetProductFamilyData();
	// console.log('familyData', familyData);

	if (selectedProductFamilyId === -1) {
		return <></>
	}

	if (typeof familyData === 'undefined') {
		return <></>
	}

	return (
		<div className={`results-panel__product-family-column`}>
			{
				(familyData.products.length < 1 ) ?
				<>
					No results
				</>
				:
				<>
					<h3 className='results-panel__product-family-column__heading'>{familyData.name}</h3>
					{
						getFamilyLinkSection(familyData)
					}
					<ul className='results-panel__product-family-column__listing'>
					{
						familyData.products.map(product => (
							<li key={`key-${product.name}`}
								className={`results-panel__product-family-column__listing__item`}>
									{
										product.url ?
										<Link to={{
											pathname: MakeRelativePath(product.url),
											state: {
												referringUrl: window.location.href
											}
											}}>
											<span>{product.name}</span>
											<RightArrow />
										</Link>
										:
										<span>{product.name}</span>
									}
							</li>
						))
					}
					</ul>
				</>
			}
		</div>
	)
}

export default ResultsPanelProductFamilyColumn;
