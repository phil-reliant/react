import React from "react";
import { Link } from 'react-router-dom';
import { MakeRelativePath } from '../../utils/UrlUtils';
import ArrowNoStem from '../../assets/svgs/arrow-no-stem';

const ResultsPanelBrandColumn = ({
	brandsData,
	checkedBrands,
	productFamilyTypesData,
	checkedProductFamilyTypes,
	onProductFamilySelected,
	selectedProductFamilyId
}) => {

	// console.log('brandsData_', brandsData);
	// console.log('checkedBrands_', checkedBrands);
	// console.log('productFamilyTypesData_', productFamilyTypesData);
	// console.log('checkedProductFamilyTypes_', checkedProductFamilyTypes);

	// The checkedBrands data passed in contains a collection of brand IDs and whether they are
	// checked or not. This method takes that, and returns an array of only those brands which have checked === true
	const getCheckedBrandsOnly = (checkedBrands) => {
		let onlyTrueCheckedBrands = [];
		for (let brandEntry in checkedBrands) {
			let entry = checkedBrands[brandEntry];
			if (typeof entry !== 'undefined') {
				onlyTrueCheckedBrands.push(parseInt(entry));
			}
		}

		// console.log('onlyTrueCheckedBrands', onlyTrueCheckedBrands);
		return onlyTrueCheckedBrands;
	}

	// Takes in a collection of brandData and whether brands are checked or not, and returns a filtered
	// set of brands which should be rendered (ex: all if no brands checked, or only those checked if some are checked)
	const getBrandDataToShow = (brandsData, checkedBrands) => {
		const trueCheckedBrandsOnly = getCheckedBrandsOnly(checkedBrands);
		if (trueCheckedBrandsOnly.length === 0) {
			return brandsData;
		} else {
			let brandDataToShow = [];
			for (let b in brandsData) {
				if (trueCheckedBrandsOnly.includes(brandsData[b].productBrandId)) {
					brandDataToShow.push(brandsData[b]);
				}
			}
			return brandDataToShow;
		}
	}

	// The checkedProductTypes data passed in contains a collection of product type IDs and whether they are
	// checked or not. This method takes that, and returns an array of only those product family types which have checked === true
	const getCheckedProductFamilyTypesOnly = (checkedProductFamilyTypes) => {
		let onlyTrueCheckedProductTypes = [];
		for (let ptEntry in checkedProductFamilyTypes) {
			let entry = checkedProductFamilyTypes[ptEntry];
			if (typeof entry !== 'undefined') {
				onlyTrueCheckedProductTypes.push(parseInt(entry));
			}
		}
		// console.log('onlyTrueCheckedProductTypes', onlyTrueCheckedProductTypes);
		return onlyTrueCheckedProductTypes;
	}

	const getProductFamilyTypesToShow = (checkedProductFamilyTypes) => {
		const trueCheckedProductTypes = getCheckedProductFamilyTypesOnly(checkedProductFamilyTypes);

		// if specific ones were selected, then return them
		if (trueCheckedProductTypes.length !== 0) {
			return trueCheckedProductTypes;
		}

		// otherwise we build a collection of all product types to return
		let productTypeIDsToShow = [];
		for (var index in productFamilyTypesData) {
			productTypeIDsToShow.push(productFamilyTypesData[index].productFamilyTypeId);
		}

		return productTypeIDsToShow;
	}

	// Takes in a collection of brandData and whether product types are checked or not, and returns a filtered
	// set of brands with their subcollection of productCache filtered by what should be rendered (ex: all if no product types checked,
	// or only those checked if some are checked)
	const getBrandAndProductTypeDataToShow = (brandsData, checkedProductFamilyTypes) => {
		const productTypesToShow = getProductFamilyTypesToShow(checkedProductFamilyTypes);
		// console.log('productTypesToShow', productTypesToShow);

		let filteredBrandsData = [];

		for (let b in brandsData) {
			const thisBrand = brandsData[b];

			let addThisBrand = false;
			let jsonParsed = false;
			let brandProductCache = {};
			try {
				brandProductCache = JSON.parse(thisBrand.productCache);
				jsonParsed = true;
			} catch (ex) {
				// there is no product cache, so there is nothing to show for this brand
				jsonParsed = false;
			}

			if (jsonParsed) {
				// iterate the product cache looking at productFamilyTypeId
				let filteredProductCache = [];
				for (var index in productTypesToShow) {
					let typeId = productTypesToShow[index];

					if (typeId in brandProductCache) {
						let brandProductCacheEntry = brandProductCache[typeId];

						if (hasProductFamiliesToShowForBrandAndType(brandProductCacheEntry)) {
							filteredProductCache.push(brandProductCacheEntry);
							addThisBrand = true;
						}
					}
				}
				thisBrand['filteredProductCache'] = filteredProductCache;
				// console.log('adjusted thisBrand', thisBrand);
			} else {
				thisBrand['filteredProductCache'] = [];
			}

			// we do want to show a brand, even if it has no data, if it has a link and/or additional links specified (REF: RUAT-16)
			if (!addThisBrand) {
				if (thisBrand.BrandInformation && thisBrand.BrandInformation.linkFromHardwareCatalog && thisBrand.BrandInformation.linkFromHardwareCatalog.url) {
					addThisBrand = true;
				}
				if (thisBrand.BrandInformation && thisBrand.BrandInformation.additionalLinks && thisBrand.BrandInformation.additionalLinks.length > 0) {
					addThisBrand = true;
				}
			}

			if (addThisBrand) {
				filteredBrandsData.push(brandsData[b]);
			}
		}
		return filteredBrandsData;
	}

	const hasProductFamiliesToShowForBrandAndType = (productType) => {
		// console.log('pf', productType.families);
		let hasDataToShow = false;
		if (productType.families && Object.keys(productType.families).length > 0) {
			for (var key in productType.families) {
				if (productType.families.hasOwnProperty(key)) {
					// make sure the family actually has products in it
					if (productType.families[key].products.length > 0) {
						hasDataToShow = true;
					}
				}
			}
		}
		return hasDataToShow;
	}

	// sort families alphabetically by name
	function GetFamilySortOrder() {
		return function(a, b) {
			if (a[1].name > b[1].name) {
				return 1;
			} else if (a[1].name < b[1].name) {
				return -1;
			}
			return 0;
		}
	}

	// takes in a javascript collection of families and turns it into a sorted array (array item has item[0] = familyID and item[1] = data collection about the family)
	const sortFamiliesIntoArray = (families) => {
		let familyArray = [];

		if (!families || families.length === 0) {
			return familyArray;
		}

		for (var item in families) {
			familyArray.push([item, families[item]]);
		}

		familyArray.sort(GetFamilySortOrder());

		return familyArray;
	}

	// returns a link text that has the number of items appended (if any) (ex: 'Product Family (22)')
	const formatFamilyLinkText = (family) => {
		// console.log('family', family.products);
		let linkText = `${family.name}`;
			if (family.products.length > 0) {
				linkText = `${family.name} (${family.products.length})`;
			}
			else {
				linkText = '';
			}

		return (
			<>{linkText}</>
		);
	}

	const getBrandPageLinkSection = (brandEntry) => {
		return (
			<div className={`results-panel__brand-column__link-section`}>
				{ brandEntry.BrandInformation &&
					brandEntry.BrandInformation.linkFromHardwareCatalog &&
					brandEntry.BrandInformation.linkFromHardwareCatalog.url ?
					<div className="buttons --align-left">
						<Link className="button --standard --allow-narrow arrow-icon"
							to={MakeRelativePath(brandEntry.BrandInformation.linkFromHardwareCatalog.url)}>
							<span>Learn about {brandEntry.title}</span>
							<div className={`arrow-icon`}>
								<ArrowNoStem />
							</div>
						</Link>
					</div>
					:
					<></>
				}
				{ brandEntry.BrandInformation &&
					brandEntry.BrandInformation.additionalLinks &&
					brandEntry.BrandInformation.additionalLinks.length > 0 ?
					<div className="buttons --align-left">
						{
							brandEntry.BrandInformation.additionalLinks.map((linkEntry, index) => (
								<Link key={`additional-link-${index}`}
									className="button --standard --allow-narrow --black-border arrow-icon"
									target={linkEntry.link.target}
									to={MakeRelativePath(linkEntry.link.url)}>
									<span>{linkEntry.link.title}</span>
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

	// first filter by selected brands (or all if none selected) ..
	const brandDataFilteredBySelectedBrands = getBrandDataToShow(brandsData, checkedBrands);
	// console.log('brandDataFilteredBySelectedBrands', brandDataFilteredBySelectedBrands);

	// .. then filter by selected product type (or all if none selected)
	const filteredData =
		getBrandAndProductTypeDataToShow(brandDataFilteredBySelectedBrands, checkedProductFamilyTypes);
	// console.log('filteredData', filteredData); // look at brand.filteredProductCache

	const rootClass = 'results-panel__brand-column';
	return (
		// brand > type > family
		<div className={rootClass}>
			{
				filteredData.map(brandEntry => (
					<div key={`brand-${brandEntry.productBrandId}`}
						className={`${rootClass}__brand-section`}>

						{/* Brand (ex: DELL) */}
						<h3 className={`${rootClass}__brand-section__heading`}>{brandEntry.title}</h3>
						{
							// brand page links
							getBrandPageLinkSection(brandEntry)
						}
						{
							// product family types
							brandEntry.filteredProductCache.map(prodTypeEntry => (

								hasProductFamiliesToShowForBrandAndType(prodTypeEntry) ?

									<div key={`pt-${prodTypeEntry.name}`}
										className={`${rootClass}__brand-section__product-type-section`}>
										<h4 className={`${rootClass}__brand-section__product-type-section__heading`}>
											{/* Product Type heading (ex: Servers, Storage, Networking) */}
											{prodTypeEntry.name}
										</h4>
										{
											// console.log('fams', prodTypeEntry.families)
											// product families
											sortFamiliesIntoArray(prodTypeEntry.families).map((ptFamily, index) => (
												<div key={`ptf-${index}`}
													className={`${rootClass}__brand-section__product-type-section__product-type-family`}>
													<h5 className={`${rootClass}__brand-section__product-type-section__product-type-family__heading
														${selectedProductFamilyId === ptFamily[0] ? 'active': ''}`}
														onClick={() => onProductFamilySelected(ptFamily[0])}>
															{formatFamilyLinkText(ptFamily[1])}
													</h5>
												</div>
											))
										}
									</div>
									:
									<></>
							))
						}
					</div>
				))
			}
		</div>
	)
}

export default ResultsPanelBrandColumn;
