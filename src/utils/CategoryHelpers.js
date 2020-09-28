import { UnescapeText } from './TextHelpers';

// This method will take a categories response from GraphQL and return it as a comma seperated string of categories
export const CategoriesToString = (categories) => {
	let categoryNames = [];

	if (categories && categories.edges && categories.edges.length > 0) {
		for (let categoryIndex in categories.edges) {
			let category = categories.edges[categoryIndex];
			categoryNames.push(UnescapeText(category.node.name));
		}
	}
	else if (categories && categories.nodes && categories.nodes.length > 0) {
		for (let categoryIndex in categories.nodes) {
			let category = categories.nodes[categoryIndex];
			categoryNames.push(UnescapeText(category.name));
		}
	}

	return categoryNames.join(', ');
}

export const GetCategoryFriendlyName = (categories, slug) => {
	for (let categoryIndex in categories.edges) {
		let category = categories.edges[categoryIndex];
		if (category.node.slug === slug) {
			return UnescapeText(category.node.name);
		}
	}

	console.error('GetCategoryFriendlyName was unable to find a matching slug!');
	return slug;
}

export const GetFirstCategory = (categories) => {
	// console.log('GetFirstCategory categories', categories);

	let firstCategory = null;
	if (categories) {
		if (categories.edges && categories.edges.length > 0) {
			firstCategory = categories.edges[0];
		} else if (categories.nodes && categories.nodes.length > 0) {
			firstCategory = categories.nodes[0];
		}
	}

	// console.log('GetFirstCategory firstCategory', firstCategory);
	return firstCategory;
}

export const GetFirstCategoryName = (categories) => {
	// console.log('GetFirstCategoryName categories', categories);
	let firstCategory = GetFirstCategory(categories);
	if (firstCategory === null) {
		return null;
	}

	// console.log('GetFirstCategoryName firstCategory.name', firstCategory.node.name);
	return firstCategory.node.name;
}
