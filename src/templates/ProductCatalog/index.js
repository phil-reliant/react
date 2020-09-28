import React, { useState, useEffect } from "react";
import useQueryState from 'use-query-state';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string'
import CatalogMobile from './CatalogMobile';
import CatalogNonMobile from './CatalogNonMobile';
import FillImage from "../../assets/images/circuit-board-ram.jpg";
import LoadingPage from '../../components/LoadingPage';
import SideBars9 from "../../assets/images/side-bars-9.png";

const ProductCatalog = props => {
	const [searchText, setSearchText] = useState('', 'searchText');
	const [submittedSearchText, setSubmittedSearchText] = useQueryState('', 'submittedSearchText');
	const [checkedBrands, setCheckedBrands] = useQueryState([], 'brands');
	const [checkedProductFamilyTypes, setCheckedProductFamilyTypes] = useQueryState([], 'familyTypes');
	const [selectedProductFamilyId, setSelectedProductFamilyId] = useQueryState(-1, 'productFamilyId');

	const BRAND_AND_TYPE_QUERY = gql`
		query BRAND_AND_TYPE_QUERY {
			productBrands(where: {orderby: {field: TITLE, order: ASC}}) {
				nodes {
					title
					link
					productCache
					productBrandId
					BrandInformation  {
						linkFromHardwareCatalog {
							target
							title
							url
						}
						additionalLinks {
							link {
								target
								title
								url
							}
						}
					}
				}
			}
			productFamilyTypes(where: {orderby: {field: TITLE, order: ASC}}) {
				nodes {
					title
					productFamilyTypeId
				}
			}
		}
	`;

	const handleCheckedBrandsChanged = (event) => {
		const brandIdAsString = event.target.id;

		// NOTE:: you have to create a new array in order for the value change to propogate  / fire (otherwise useEffect doesnt fire for example) ref: https://stackoverflow.com/a/54621059/18005
		let newCheckedBrands = [...checkedBrands];

		// update the array to add/remove the item checked/unchecked
		if (!event.target.checked) { // not checked
			if (newCheckedBrands.includes(brandIdAsString)) { // remove it
				const removeIndex = newCheckedBrands.indexOf(brandIdAsString);
				newCheckedBrands.splice(removeIndex, 1);
			}
		} else { // checked
			// if it contains it already then do nothing
			if (!newCheckedBrands.includes(brandIdAsString)) {
				newCheckedBrands.push(brandIdAsString); // add it
			}
		}

		// console.log('index.handleCheckedBrandsChanged is clearing search texts');
		resetSearchText();
		setSelectedProductFamilyId(-1);
		setCheckedBrands(newCheckedBrands);
	}

	const handleCheckedProductTypesChanged = (event) => {
		const productTypeIdAsString = event.target.id;

		// NOTE:: you have to create a new array in order for the value change to propogate  / fire (otherwise useEffect doesnt fire for example) ref: https://stackoverflow.com/a/54621059/18005
		let newCheckedProductFamilyTypes = [...checkedProductFamilyTypes];

		// update the array to add/remove the item checked/unchecked
		if (!event.target.checked) { // not checked
			if (newCheckedProductFamilyTypes.includes(productTypeIdAsString)) { // remove it
				const removeIndex = newCheckedProductFamilyTypes.indexOf(productTypeIdAsString);
				newCheckedProductFamilyTypes.splice(removeIndex, 1);
			}
		} else { // checked
			// if it contains it already then do nothing
			if (!newCheckedProductFamilyTypes.includes(productTypeIdAsString)) {
				newCheckedProductFamilyTypes.push(productTypeIdAsString); // add it
			}
		}

		// console.log('index.handleCheckedProductTypesChanged is clearing search texts');
		resetSearchText();
		setCheckedProductFamilyTypes(newCheckedProductFamilyTypes);
		setSelectedProductFamilyId(-1);
	}

	const clearFilters = () => {
		let newCheckedBrands = [];
		let newCheckedProductFamilyTypes = [];
		setCheckedBrands(newCheckedBrands);
		setCheckedProductFamilyTypes(newCheckedProductFamilyTypes);
	}

	const onSearchTextChange = (ev) => {
		ev.preventDefault();

		setSearchText(ev.target.value);
		clearFilters();
	}

	const onSearchFormSubmit = (ev) => {
		ev.preventDefault();

		setSubmittedSearchText(searchText);
	}

	const onProductFamilySelected = (ptFamily, onDesktop) => {
		// console.log('productFamilySelected', ptFamily);

		// scroll to top of results area, but only if on mobile
		if (typeof onDesktop !== 'undefined' && onDesktop) {
			const resultsPanel = document.querySelector('.results-panel');
			if (resultsPanel) {
				const scrollToY = resultsPanel.getBoundingClientRect().top;
				window.scrollBy(0, scrollToY);
			} else {
				window.scrollTo(0, 0);
			}
		}

		setSelectedProductFamilyId(ptFamily);
	}

	const resetSearchText = () => {
		setSearchText("");
		setSubmittedSearchText("");
	}

	const headerStyles = {
		backgroundImage: `url('${FillImage}')`,
		backgroundSize: `cover`,
		backgroundPosition: `center center`,
		backgroundRepeat: `no-repeat`
	};

	const { loading, error, data } = useQuery(BRAND_AND_TYPE_QUERY, {});

	useEffect(() => {
		// see if a query param was passed in, if so, do immediate search
		const urlParams = queryString.parse(props.location.search)
		let searchTerm = "";
		if ('searchTerm' in urlParams) {
			searchTerm = urlParams['searchTerm'];

			if (submittedSearchText !== searchTerm) {
				setSearchText(searchTerm);
				setSubmittedSearchText(searchTerm);
			}
			props.location.search = "";
		}
	}, [props.location.search, searchText, submittedSearchText, setSearchText, setSubmittedSearchText])

	useEffect(() => {
		// console.log('index.js checkedBrands changed, useEffect hit', checkedBrands);
	}, [checkedBrands])

	if (loading) {
		return <LoadingPage />;
	}
	if (error) {
		console.error('Error loading Product Catalog', error);
		return <p>Error loading Product Catalog</p>;
	}
	if (!data.productBrands || data.productBrands.length < 1) return <p>No brands found</p>;
	if (!data.productFamilyTypes || data.productFamilyTypes.length < 1) return <p>No product types found</p>;

	const brandsData = data.productBrands.nodes;
	const productFamilyTypesData = data.productFamilyTypes.nodes;
	// console.log('brand data', brandsData);
	// console.log('product family data', productFamilyTypesData);

	return (
		<>
			<section className={`product-catalog bg-lt-grey`}>
				<div className={`product-catalog__header`} style={headerStyles}>
					<img className={`side-bars`} src={SideBars9} alt={"Side Bars"} />
					<div className={`product-catalog__header__inner container`}>
						<div className={`row`}>
							<div className='col-12 col-md-6 product-catalog__header__inner__left-col'>
								<h1 className={`product-catalog__header__inner__title`}>Hardware Catalog</h1>
							</div>
							<div className='col-12 col-md-6 product-catalog__header__inner__right-col'>
								<ul className='product-catalog__header__inner__right-col__listing'>
									<li className='product-catalog__header__inner__right-col__listing__item'>Find the brands you're looking for</li>
									<li className='product-catalog__header__inner__right-col__listing__item'>Get product specs and user manuals</li>
									<li className='product-catalog__header__inner__right-col__listing__item'>Discover products that pair</li>
									<li className='product-catalog__header__inner__right-col__listing__item'>Look up end-of-life information</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="--desktop-only product-catalog">
				<CatalogNonMobile
					searchText={searchText}
					submittedSearchText={submittedSearchText}
					onSearchTextChange={onSearchTextChange}
					onSearchFormSubmit={onSearchFormSubmit}
					brandsData={brandsData}
					checkedBrands={checkedBrands}
					handleCheckedBrandsChanged={handleCheckedBrandsChanged}
					onProductFamilySelected={onProductFamilySelected}
					selectedProductFamilyId={selectedProductFamilyId}
					productFamilyTypesData={productFamilyTypesData}
					checkedProductFamilyTypes={checkedProductFamilyTypes}
					handleCheckedProductTypesChanged={handleCheckedProductTypesChanged} />
			</div>
			<div className="--mobile-only product-catalog">
				<CatalogMobile
					searchText={searchText}
					submittedSearchText={submittedSearchText}
					onSearchTextChange={onSearchTextChange}
					resetSearchText={resetSearchText}
					onSearchFormSubmit={onSearchFormSubmit}
					brandsData={brandsData}
					checkedBrands={checkedBrands}
					handleCheckedBrandsChanged={handleCheckedBrandsChanged}
					onProductFamilySelected={onProductFamilySelected}
					selectedProductFamilyId={selectedProductFamilyId}
					productFamilyTypesData={productFamilyTypesData}
					checkedProductFamilyTypes={checkedProductFamilyTypes}
					handleCheckedProductTypesChanged={handleCheckedProductTypesChanged} />
			</div>
		</>
	)
}

export default ProductCatalog;
