import React, { useState, useEffect } from "react";
import { HasBrandsSelected, HasProductFamilyTypesSelected } from './CatalogHelpers';
import ErrorBoundary from '../../components/ErrorBoundary';
import BrandListing from './BrandListing';
import HardwareToSell from '../../components/HardwareToSell';
import ProductTypeListing from './ProductTypeListing';
import ResultsLandingPanel from './ResultsLandingPanel';
import ResultsPanelBrandColumn from './ResultsPanelBrandColumn';
import ResultsPanelProductFamilyColumn from './ResultsPanelProductFamilyColumn';
import SearchField from './SearchField';
import SearchResultsPanel from './SearchResultsPanel';
import SelectedFiltersListing from './SelectedFiltersListing';

const CatalogNonMobile = ({
	searchText, submittedSearchText, onSearchTextChange, onSearchFormSubmit,
	brandsData, checkedBrands, handleCheckedBrandsChanged,
	onProductFamilySelected, selectedProductFamilyId,
	productFamilyTypesData, checkedProductFamilyTypes, handleCheckedProductTypesChanged
	}) => {

	const SHOW_LANDING_PANEL = 0;
	const SHOW_SEARCH_RESULTS_PANEL = 1;
	const SHOW_FILTER_RESULTS_PANEL = 2;

	const [panelToShow, setPanelToShow] = useState(SHOW_LANDING_PANEL); // 0 = landing, 1 = search results, 2 = filter results

	// fired when the selection of checked brands changes
	useEffect(() => {
		const updateShowResultsLandingPage = () => {

			let panelToShow = SHOW_LANDING_PANEL;
			if (submittedSearchText !== "") {
				panelToShow = SHOW_SEARCH_RESULTS_PANEL;
			} else if (HasBrandsSelected(checkedBrands)) {
				panelToShow = SHOW_FILTER_RESULTS_PANEL;
			} else if (HasProductFamilyTypesSelected(checkedProductFamilyTypes)) {
				panelToShow = SHOW_FILTER_RESULTS_PANEL;
			}

			return panelToShow;
		}

		const panel = updateShowResultsLandingPage();
		setPanelToShow(panel);
	}, [checkedBrands, checkedProductFamilyTypes, submittedSearchText]);

	return (
		<>
			<section className={`bg-lt-grey`}>
				<div className={`product-catalog__inner fluid-container`}>
					<div className={'product-catalog__inner row'}>
						<div className={`product-catalog__inner__sidebar-area bg-lt-white col-3`}>
							<ErrorBoundary>
								<div className={`search-panel`}>
									<SearchField
										searchText={searchText}
										onSearchTextChange={onSearchTextChange}
										onSearchFormSubmit={onSearchFormSubmit} />
									<div className='search-panel__browse-by'>
										<div className='search-panel__browse-by__heading'>Browse By</div>
										<SelectedFiltersListing
											brandsData={brandsData}
											checkedBrands={checkedBrands}
											handleCheckedBrandsChanged={handleCheckedBrandsChanged}
											productFamilyTypesData={productFamilyTypesData}
											checkedProductFamilyTypes={checkedProductFamilyTypes}
											handleCheckedProductTypesChanged={handleCheckedProductTypesChanged}
											/>
										<BrandListing
											brandsData={brandsData}
											checkedBrands={checkedBrands}
											handleCheckedBrandsChanged={handleCheckedBrandsChanged} />
										<ProductTypeListing
											productFamilyTypesData={productFamilyTypesData}
											checkedProductFamilyTypes={checkedProductFamilyTypes}
											handleCheckedProductTypesChanged={handleCheckedProductTypesChanged} />
									</div>
								</div>
							</ErrorBoundary>
						</div>
						<div className={`bg-lt-grey col-1`}></div>
						{ panelToShow === SHOW_LANDING_PANEL ?
							<div className={`product-catalog__inner__landing-page-area col-8`}>
								<ErrorBoundary>
									<ResultsLandingPanel />
								</ErrorBoundary>
							</div>
							:
							<></>
						}
						{ panelToShow === SHOW_SEARCH_RESULTS_PANEL ?
							<SearchResultsPanel submittedSearchText={submittedSearchText} />
							:
							<></>
						}
						{ panelToShow === SHOW_FILTER_RESULTS_PANEL ?
							<>
								<div className={`results-panel results-col-1 col-3 col-xl-auto`}>
									<ErrorBoundary>
										<ResultsPanelBrandColumn
											brandsData={brandsData}
											checkedBrands={checkedBrands}
											productFamilyTypesData={productFamilyTypesData}
											checkedProductFamilyTypes={checkedProductFamilyTypes}
											onProductFamilySelected={(family) => onProductFamilySelected(family, { onDesktop:true })}
											selectedProductFamilyId={selectedProductFamilyId}
											/>
									</ErrorBoundary>
								</div>
								<div className={`results-panel results-col-2 col-3 col-xl-auto`}>
									<ErrorBoundary>
										<ResultsPanelProductFamilyColumn
											brandsData={brandsData}
											selectedProductFamilyId={selectedProductFamilyId} />
									</ErrorBoundary>
								</div>
								<div className={`col-2`}></div>
							</>
							:
							<></>
						}
					</div>
				</div>
			</section>
			<section>
				<HardwareToSell />
			</section>
		</>
	);
}

export default CatalogNonMobile;
