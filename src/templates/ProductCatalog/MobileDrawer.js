import React from "react";
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';
import ErrorBoundary from '../../components/ErrorBoundary';
import BrandListing from './BrandListing';
import CloseButton from '../../assets/svgs/close-button';
import ProductTypeListing from './ProductTypeListing';
import ResultsPanelBrandColumn from './ResultsPanelBrandColumn';
import ResultsPanelProductFamilyColumn from './ResultsPanelProductFamilyColumn';
import SearchField from './SearchField';
import SearchResultsPanel from './SearchResultsPanel';
import {
	DRAWER_CLOSED, DRAWER_PAGE_1, DRAWER_PAGE_2, DRAWER_RESULTS, DRAWER_SEARCH_RESULTS,
	SEARCH_STARTED_OUTSIDE_DRAWER /*, SEARCH_STARTED_DRAWER_PAGE_1, SEARCH_STARTED_DRAWER_PAGE_2 */
} from './DrawerPageConstants';
import SelectedFiltersListing from './SelectedFiltersListing';

const MobileDrawer = ({
	drawerToShow,
	searchText, onSearchTextChange, onSearchFormSubmit, submittedSearchText,
	brandsData, checkedBrands, handleCheckedBrandsChanged,
	onProductFamilySelected, selectedProductFamilyId,
	productFamilyTypesData, checkedProductFamilyTypes, handleCheckedProductTypesChanged,
	searchStartedFrom,
	closeDrawer, nextFromPage1, editFromPage2, backFromResults, backFromSearchResults
	}) => {

	return (
		<div className='container-fluid product-catalog__drawer'>
			<div className={`product-catalog__drawer__inner
				${drawerToShow !== DRAWER_CLOSED ? 'active' : ''}`}>

				<div className={`product-catalog__drawer__inner__header-buttons
					${(drawerToShow === DRAWER_PAGE_2 || drawerToShow === DRAWER_RESULTS || drawerToShow === DRAWER_SEARCH_RESULTS) ? 'bg-lt-white' : ''}`}>
					<div className={`product-catalog__drawer__inner__header-buttons__left-btn`}>
						{
							(drawerToShow === DRAWER_PAGE_2) ?
								<button className="link-button no-decoration arrow-link --back" onClick={editFromPage2}>
									<ArrowNoStem />
									<span>EDIT</span>
								</button>
								:
								<></>
						}
						{
							(drawerToShow === DRAWER_RESULTS) ?
								<button className="link-button no-decoration arrow-link --back" onClick={backFromResults}>
									<ArrowNoStem />
									<span>BACK</span>
								</button>
								:
								<></>
						}
						{
							(drawerToShow === DRAWER_SEARCH_RESULTS && searchStartedFrom !== SEARCH_STARTED_OUTSIDE_DRAWER) ?
								<button className="link-button no-decoration arrow-link --back" onClick={backFromSearchResults}>
									<ArrowNoStem />
									<span>BACK</span>
								</button>
								:
								<></>
						}
					</div>

					<div className={`product-catalog__drawer__inner__header-buttons__close`}
						onClick={closeDrawer}>
						<CloseButton />
					</div>
				</div>

				{/* NOTE:: the basic concept is that if the user is on a screen beyond the current screen (ex: page 2), then it
				should have a `pushed-left` class applied so it is pushed to the left instead of right */}
				<div className={`product-catalog__drawer__inner__page_container`}>
					<div className={`product-catalog__drawer__inner__page_container__page_1
						${drawerToShow === DRAWER_PAGE_1 ? 'active' : 'inactive'}
						${(drawerToShow !== DRAWER_PAGE_1 && drawerToShow !== DRAWER_CLOSED) ? 'pushed-left' : ''}
						`}>
						<div className={`product-catalog__drawer__inner__page_container__page_1__search-wrapper`}>
							<SearchField
								searchText={searchText}
								onSearchTextChange={onSearchTextChange}
								onSearchFormSubmit={onSearchFormSubmit} />
						</div>
						<div className={`product-catalog__drawer__inner__page_container__page_1__brand-wrapper`}>
							<span className={`product-catalog__drawer__inner__page_container__page_1__brand-wrapper__instructions`}>
								Select all that apply.
							</span>
							<BrandListing
								brandsData={brandsData}
								checkedBrands={checkedBrands}
								handleCheckedBrandsChanged={handleCheckedBrandsChanged} />
						</div>
						<div className={`product-catalog__drawer__inner__page_container__page_1__product-type-wrapper`}>
							<ProductTypeListing
								productFamilyTypesData={productFamilyTypesData}
								checkedProductFamilyTypes={checkedProductFamilyTypes}
								handleCheckedProductTypesChanged={handleCheckedProductTypesChanged} />
						</div>
						<div className={`product-catalog__drawer__inner__page_container__page_1__buttons-wrapper`}>
							<div className="buttons --align-left">
								<button className="button --standard --left arrow-icon"
									onClick={nextFromPage1}>
									<span>Apply</span>
									<div className={`arrow-icon`}>
										<ArrowNoStem />
									</div>
								</button>
							</div>
						</div>
					</div>
					<div className={`product-catalog__drawer__inner__page_container__page_2
						${drawerToShow === DRAWER_PAGE_2 ? 'active' : 'inactive'}
						${drawerToShow === DRAWER_RESULTS || drawerToShow === DRAWER_SEARCH_RESULTS ? 'pushed-left' : ''}`
						}>
						<div className={`product-catalog__drawer__inner__page_container__page_2__results-brand-column`}>
							<ErrorBoundary>
								<>
									<SelectedFiltersListing
										brandsData={brandsData}
										checkedBrands={checkedBrands}
										handleCheckedBrandsChanged={handleCheckedBrandsChanged}
										productFamilyTypesData={productFamilyTypesData}
										checkedProductFamilyTypes={checkedProductFamilyTypes}
										handleCheckedProductTypesChanged={handleCheckedProductTypesChanged}
										/>

									<ResultsPanelBrandColumn
										brandsData={brandsData}
										checkedBrands={checkedBrands}
										productFamilyTypesData={productFamilyTypesData}
										checkedProductFamilyTypes={checkedProductFamilyTypes}
										onProductFamilySelected={onProductFamilySelected}
										selectedProductFamilyId={selectedProductFamilyId}
										/>
								</>
							</ErrorBoundary>
						</div>
					</div>
					<div className={`product-catalog__drawer__inner__page_container__page_3
						${drawerToShow === DRAWER_RESULTS ? 'active' : 'inactive'}
						${drawerToShow === DRAWER_SEARCH_RESULTS ? 'pushed-left' : ''}`
						}>
						<div className={`product-catalog__drawer__inner__page_container__page_3__results-brand-column`}>
							<ErrorBoundary>
								<ResultsPanelProductFamilyColumn
									brandsData={brandsData}
									selectedProductFamilyId={selectedProductFamilyId} />
							</ErrorBoundary>
						</div>
					</div>

					<div className={`product-catalog__drawer__inner__page_container__page_4
						${drawerToShow === DRAWER_SEARCH_RESULTS ? 'active' : 'inactive'}`}>
						<div className={`product-catalog__drawer__inner__page_container__page_4__search-results-column`}>
							<ErrorBoundary>
								{ drawerToShow === DRAWER_SEARCH_RESULTS ?
									<SearchResultsPanel submittedSearchText={submittedSearchText} />
									:
									<></>
								}
							</ErrorBoundary>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MobileDrawer;
