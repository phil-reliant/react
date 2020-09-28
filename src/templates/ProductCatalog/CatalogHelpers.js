export const HasBrandsSelected = (checkedBrands) => {
	// console.log('HasBrandsSelected called with ', checkedBrands);
	if (typeof checkedBrands !== 'undefined') {
		if (checkedBrands.length === 0) {
			return false;
		}
		if (AllEntriesUndefined(checkedBrands)) {
			return false;
		}

		return true;
	}
	return false;
}

export const HasProductFamilyTypesSelected = (checkedProductFamilyTypes) => {
	// console.log('HasProductFamilyTypesSelected called with ', checkedProductFamilyTypes);
	if (typeof checkedProductFamilyTypes !== 'undefined') {
		if (checkedProductFamilyTypes.length === 0) {
			return false;
		}
		if (AllEntriesUndefined(checkedProductFamilyTypes)) {
			return false;
		}

		return true;
	}
	return false;
}

const AllEntriesUndefined = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		let item = arr[i];
		if (typeof item !== 'undefined') {
			return false;
		}
	}

	return true;
}
