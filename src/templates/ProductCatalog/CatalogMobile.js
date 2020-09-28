import React, { useState, useEffect } from "react";
import ErrorBoundary from '../../components/ErrorBoundary';
import ArrowInCircle from '../../assets/svgs/arrow-in-circle';
import HardwareToSell from '../../components/HardwareToSell';
import MobileDrawer from './MobileDrawer';
import ResultsLandingPanel from './ResultsLandingPanel';
import SearchField from './SearchField';
import {
	DRAWER_CLOSED, DRAWER_PAGE_1, DRAWER_PAGE_2, DRAWER_RESULTS, DRAWER_SEARCH_RESULTS,
	SEARCH_STARTED_OUTSIDE_DRAWER, SEARCH_STARTED_DRAWER_PAGE_1
} from './DrawerPageConstants';

const CatalogMobile = ({
	searchText, submittedSearchText, onSearchTextChange, onSearchFormSubmit, resetSearchText,
	brandsData, checkedBrands, handleCheckedBrandsChanged,
	onProductFamilySelected, selectedProductFamilyId,
	productFamilyTypesData, checkedProductFamilyTypes, handleCheckedProductTypesChanged
	}) => {

	const [drawerToShow, setDrawerToShow] = useState(DRAWER_CLOSED);
	const [searchStartedFrom, setSearchStartedFrom] = useState(SEARCH_STARTED_OUTSIDE_DRAWER);

	const openFilterHardwareButtonClicked = () => {
		setDrawerToShow(DRAWER_PAGE_1);
	}

	const closeDrawer = () => {
		resetSearchText();
		setDrawerToShow(DRAWER_CLOSED);
	}

	const nextFromPage1 = () => {
		setDrawerToShow(DRAWER_PAGE_2);
	}

	const editFromPage2 = () => {
		setDrawerToShow(DRAWER_PAGE_1);
	}

	const backFromResults = () => {
		setDrawerToShow(DRAWER_PAGE_2);
	}

	const backFromSearchResults = () => {
		resetSearchText();
		if (searchStartedFrom === SEARCH_STARTED_DRAWER_PAGE_1) {
			setDrawerToShow(DRAWER_PAGE_1);
		}
	}

	const onProductFamilySelectedInternal = (ptFamily) => {
		onProductFamilySelected(ptFamily);
		setDrawerToShow(DRAWER_RESULTS);
	}

	useEffect(() => {
		const updateDrawerShownBasedOnSearch = () => {
			const searchIsSet = (typeof submittedSearchText !== 'undefined') && submittedSearchText !== "";
			if (searchIsSet && drawerToShow !== DRAWER_SEARCH_RESULTS) {
				if (drawerToShow === DRAWER_PAGE_1) {
					setSearchStartedFrom(SEARCH_STARTED_DRAWER_PAGE_1);
				} else {
					setSearchStartedFrom(SEARCH_STARTED_OUTSIDE_DRAWER);
				}

				setDrawerToShow(DRAWER_SEARCH_RESULTS);
			} else if (!searchIsSet && drawerToShow === DRAWER_SEARCH_RESULTS) {
				setDrawerToShow(DRAWER_CLOSED);
			}
		}

		updateDrawerShownBasedOnSearch();
	}, [submittedSearchText, drawerToShow]);

	const baseClass = "product-catalog";
	return (
		<>
			<section>
				<div className={`container`}>
					<div className={`row ${baseClass}__mobile-search-wrapper bg-lt-grey`}>
						<div className={`col-12`}>
							<ErrorBoundary>
								<SearchField
									searchText={searchText}
									onSearchTextChange={onSearchTextChange}
									onSearchFormSubmit={onSearchFormSubmit} />
							</ErrorBoundary>
						</div>
					</div>
					<div className={`row ${baseClass}__filter-hardware`}>
						<div className={`col-12`}>
							<div className={`${baseClass}__filter-hardware__button`}
								onClick={openFilterHardwareButtonClicked}>
								<div className={`${baseClass}__filter-hardware__button__text`}>
									Browse Hardware
								</div>
								<button className="link-button">
									<div className={`${baseClass}__filter-hardware__button__arrow`}>
										<ArrowInCircle />
									</div>
								</button>
							</div>
						</div>
					</div>
					<div className={`row`}>
						<div className={`col-12`}>
							<div className={`product-catalog__inner__landing-page-area`}>
								<ErrorBoundary>
									<ResultsLandingPanel />
								</ErrorBoundary>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<HardwareToSell />
			</section>
			<section>
				<MobileDrawer drawerToShow={drawerToShow}
					searchText={searchText}
					onSearchTextChange={onSearchTextChange}
					onSearchFormSubmit={onSearchFormSubmit}
					submittedSearchText={submittedSearchText}
					brandsData={brandsData}
					checkedBrands={checkedBrands}
					handleCheckedBrandsChanged={handleCheckedBrandsChanged}
					onProductFamilySelected={onProductFamilySelectedInternal}
					selectedProductFamilyId={selectedProductFamilyId}
					productFamilyTypesData={productFamilyTypesData}
					checkedProductFamilyTypes={checkedProductFamilyTypes}
					handleCheckedProductTypesChanged={handleCheckedProductTypesChanged}
					searchStartedFrom={searchStartedFrom}
					closeDrawer={closeDrawer}
					nextFromPage1={nextFromPage1}
					editFromPage2={editFromPage2}
					backFromResults={backFromResults}
					backFromSearchResults={backFromSearchResults} />
			</section>
		</>
	);
}

export default CatalogMobile;
