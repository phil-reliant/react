import React from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { MakeRelativePath } from '../../utils/UrlUtils';
import LoadingSpinner from '../../components/LoadingSpinner';
import RightArrow from '../../assets/svgs/right-arrow.js';

const SearchResultsPanel = ({ submittedSearchText }) => {

	const maxResults = 10000;

	const PRODUCT_SEARCH_QUERY = gql`
			query PRODUCT_SEARCH_QUERY($searchTerm: String) {
				products(where: {search: $searchTerm, orderby: {field: SLUG, order: ASC}}, first: ${maxResults}) {
					edges {
						node {
							link
							name
							productId
						}
					}
				}
			}
		`;

	const { loading, error, data } = useQuery(PRODUCT_SEARCH_QUERY, {
		variables: { searchTerm: submittedSearchText }
	});

	let resultsMessage = "";
	let resultCount = 0;
	let resultSet = null;

	if (loading) {
		return <LoadingSpinner paddingTopLarge />
	}
	if (error) {
		console.error("SearchResultsPanel module failed to run query!", error);
		resultsMessage = `An error occurred while querying products. ${error}`;
	} else if (!data.products || !data.products.edges) {
		resultsMessage = "No results found";
	} else {
		resultCount = data.products.edges.length;
		resultSet = data.products.edges;
		resultsMessage = `${resultCount} Results`;
		if (resultCount === maxResults) {
			resultsMessage = `Showing first ${resultCount} results`
		}
	}

	// console.log('resultSet', resultSet);
	// console.log('data', data);
	// console.log('submittedSearchText', submittedSearchText);

	return (
		<div className={`search-results-panel`}>
			<h3 className={`search-results-panel__heading`}>{submittedSearchText}</h3>
			<p className={`search-results-panel__results-label`}>{resultsMessage}</p>

			{ resultSet ?
				<div className={`search-results-panel__results-area`}>
					<ul className='search-results-panel__results-area__listing'>
						{
							resultSet.map(productNode => (
								<li key={`key-${productNode.node.productId}`}
									className={`search-results-panel__results-area__listing__item`}>
									<Link to={{
										pathname: MakeRelativePath(productNode.node.link),
										state: {
											referringUrl: window.location.href
										}
										}}>
										<span>{productNode.node.name}</span>
										<RightArrow />
									</Link>
								</li>
							))
						}
					</ul>
				</div>
				:
				<></>
			}
		</div>
	)
}

export default SearchResultsPanel;
