import React from "react";
const SelectedFiltersListing = ({
	brandsData, checkedBrands, handleCheckedBrandsChanged,
	productFamilyTypesData, checkedProductFamilyTypes, handleCheckedProductTypesChanged
}) => {

	const removeSelectedBrand = (productBrandId) => {
		const fakeEvent = {
			target: {
				id: productBrandId,
				checked: false
			}
		}

		handleCheckedBrandsChanged(fakeEvent);
	}

	const removeSelectedProductType = (productFamilyTypeId) => {
		const fakeEvent = {
			target: {
				id: productFamilyTypeId,
				checked: false
			}
		}

		handleCheckedProductTypesChanged(fakeEvent);
	}

	// debugger;
	let filteredBrandsData = [];
	for (var b in brandsData) {
		let brandInfo = brandsData[b];
		if (checkedBrands.includes(brandInfo.productBrandId.toString())) {
			filteredBrandsData.push(brandInfo);
		}
	}

	let filteredTypesData = [];
	for (var t in productFamilyTypesData) {
		let familyTypeInfo = productFamilyTypesData[t];
		if (checkedProductFamilyTypes.includes(familyTypeInfo.productFamilyTypeId.toString())) {
			filteredTypesData.push(familyTypeInfo);
		}
	}

	// console.log('SelectedFiltersListing checkedBrands', checkedBrands);
	// console.log('SelectedFiltersListing filteredBrandsData', filteredBrandsData);
	// console.log('SelectedFiltersListing checkedProductFamilyTypes', checkedProductFamilyTypes);
	// console.log('SelectedFiltersListing filteredTypesData', filteredTypesData);

	return (
		<div className='selected-filters-listing'>
			<div className="selected-filters-listing__brand-entries">
				{
					filteredBrandsData.map(item => (
						<label key={`brand-${item.productBrandId}`}
							className="filter-entry"
							onClick={() => removeSelectedBrand(item.productBrandId.toString())}>
							<span className="filter-x">x</span>
							<span className="filter-name">{item.title}</span>
						</label>
					))
				}
			</div>

			<div className="selected-filters-listing__product-type-entries">
			{
				filteredTypesData.map(item => (
						<label key={`pft-${item.productFamilyTypeId}`}
							className="filter-entry"
							onClick={() => removeSelectedProductType(item.productFamilyTypeId.toString())}>
							<span className="filter-x">x</span>
							<span className="filter-name">{item.title}</span>
						</label>
				))
			}
			</div>
		</div>
	)
}

export default SelectedFiltersListing;
