import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import ErrorBoundary from '../ErrorBoundary';
import { MakeRelativePath } from '../../utils/UrlUtils';
import { UnescapeText } from '../../utils/TextHelpers';

const CategoriesListing = props => {

	const CATEGORY_QUERY = gql`
		query GET_CATEGORIES {
			categories {
				edges {
					node {
						id
						categoryId
						name
						link
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(CATEGORY_QUERY, {});

	if (loading) {
		return <p></p>;
	}
	if (error) return <p>Error loading categories</p>;
	if (!data.categories.edges) return <p>Error loading category data</p>;

	const edges = data.categories.edges;

	return (
		<ErrorBoundary message={`Unable to load categories`}>
			<div className='categories-listing'>
				<span className="small">CATEGORIES</span>
				<ul className='categories-listing__listing'>
					{
						edges.map(category => (
							<li key={`cat-${category.node.categoryId}`}
								className='categories-listing__listing__item'>
								<Link to={`${MakeRelativePath(category.node.link)}`}>
									<span>{UnescapeText(category.node.name)}</span>
								</Link>
							</li>
						))
					}
				</ul>
			</div>
		</ErrorBoundary>
	)
}

export default CategoriesListing;
