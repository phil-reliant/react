export const CATEGORY_QUERY_PARTIAL = `
	query GET_CATEGORIES {
		categories {
			edges {
				node {
					id
					categoryId
					name
					link
					slug
				}
			}
		}
	}
`;
