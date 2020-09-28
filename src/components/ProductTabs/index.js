import React, { useState } from "react";
import { InternalOrExternalLink } from '../../utils/UrlUtils';

const ProductTabs = (props) => {

	const TAB_Insights = 0;
	const TAB_Specs = 1;
	const TAB_Compatibility = 2;

	const { productDetails } = props;

	// get the first visible tab and use that for the initial selected tab
	let initialSelectedTab = TAB_Insights;
	if (!productDetails.insights) {
		if (productDetails.specs) {
			initialSelectedTab = TAB_Specs;
		} else {
			initialSelectedTab = TAB_Compatibility;
		}
	}

	const [selectedTab, setSelectedTab] = useState(initialSelectedTab);

	const selectTab = (index) => {
		setSelectedTab(index);
	}

	const RenderInnerCell = (colText, colLink) => {
		return (
			<>
				{ colLink ?
				<InternalOrExternalLink url={colLink}>{colText}</InternalOrExternalLink>
				:
				<>{colText}</>
				}
			</>
		);
	}

	const mainContainer = `product-tabs`;
	const contentContainer = `${mainContainer}__tabber__content`;
	return (
		<div className="product-tabs">
			<div className={`${mainContainer}__tabber`}>
				<div className={`${mainContainer}__tabber__tabs`}>
					{ productDetails.insights ?
						<div className={`${mainContainer}__tabber__tabs__tab
							${selectedTab === TAB_Insights ? 'selected' : ''}`}
							onClick={() => selectTab(0)}>
							Insights
						</div>
						: null
					}
					{ productDetails.specs ?
						<div className={`${mainContainer}__tabber__tabs__tab
							${selectedTab === TAB_Specs ? 'selected' : ''}`}
							onClick={() => selectTab(1)}>
							Specs
						</div>
						: null
					}
					{ productDetails.compatibility ?
						<div className={`${mainContainer}__tabber__tabs__tab
							${selectedTab === TAB_Compatibility ? 'selected' : ''}`}
							onClick={() => selectTab(2)}>
							Compatibility
						</div>
						: null
					}
				</div>
				<div className={`${contentContainer}`}>
					<div className={`${contentContainer}__content-area insights-tab
						${selectedTab === TAB_Insights ? 'selected' : ''}`}
						dangerouslySetInnerHTML={{__html: productDetails.insights}} />
					<div className={`${contentContainer}__content-area specs-tab
						${selectedTab === TAB_Specs ? 'selected' : ''}`}>
							{ (productDetails.specs && productDetails.specs.length > 0) ?
								<>
									{
										productDetails.specs.map((item, index) => {
											return (
												<div key={`spec-item-${index}`} className={`grid-row-container`}>
													<div key={`spec_col1_${index}`}
														className={`col two-col-1 ${index % 2 ? 'alt' : ''}`}>
															{ RenderInnerCell(item.specColumn1, item.specColumn1Link) }
													</div>
													<div key={`spec_col2_${index}`}
														className={`col two-col-2 ${index % 2 ? 'alt' : ''}`}>
															{ RenderInnerCell(item.specColumn2, item.specColumn2Link) }
													</div>
												</div>
											)
										})
									}
								</>
								:
								<></>
							}
					</div>
					<div className={`${contentContainer}__content-area compatibility-tab
						${selectedTab === TAB_Compatibility ? 'selected' : ''}`}>
							{ (productDetails.compatibility && productDetails.compatibility.length > 0) ?
								<>
									{
										productDetails.compatibility.map((item, index) => {
											return (
												<div key={`compat-item-${index}`} className={`grid-row-container`}>
													<div key={`compat_col1_${index}`}
														className={`col two-col-1 ${index % 2 ? 'alt' : ''}`}>
															{ RenderInnerCell(item.compatibilityColumn1, item.compatibilityColumn1Link) }
													</div>
													<div key={`compat_col2_${index}`}
														className={`col two-col-2 ${index % 2 ? 'alt' : ''}`}>
															{ RenderInnerCell(item.compatibilityColumn2, item.compatibilityColumn2Link) }
													</div>
												</div>
											)
										})
									}
								</>
								:
								<></>
							}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductTabs;
