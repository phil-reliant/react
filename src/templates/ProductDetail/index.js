import React from "react";
import gql from 'graphql-tag';
import SEO_QUERY_PARTIAL from "../../queries/SEOQuery";
import APPEARANCE_OPTIONS_QUERY from '../../queries/AppearanceQuery.js';
import LoadingPage from '../../components/LoadingPage';
import ProductBody from './ProductBody';
import { useQuery } from '@apollo/react-hooks';
import ErrorBoundary from '../../components/ErrorBoundary';

const ProductDetail = props => {
	const { slug } = props.match.params;

	const SINGLE_PRODUCT_QUERY = gql`
		query SINGLE_PRODUCT_QUERY($slug: String!) {
			productBy(slug: $slug) {
				name
				description
				image {
					altText
					mediaItemUrl
				}
				... on SimpleProduct {
					price
					crossSell {
						edges {
						  node {
							id
							name
							link
							image {
							  altText
							  mediaItemUrl
							}
						  }
						}
					}
				}
				${SEO_QUERY_PARTIAL}
				resourcesCta {
					heading
					resources {
						__typename
						... on Post {
							id
							title
							excerpt
							link
						}
					}
					${APPEARANCE_OPTIONS_QUERY}
				}
				resource_listing {
					resourceListing {
					  resourceLabel
					  youtubeVideo
					  type
					  pdfFile {
						mediaItemUrl
					  }
					}
				}
				product_details {
					specs {
					  specColumn1
					  specColumn2
					  specColumn1Link
					  specColumn2Link
					}
					insights
					compatibility {
					  compatibilityColumn1
					  compatibilityColumn1Link
					  compatibilityColumn2
					  compatibilityColumn2Link
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: { slug: slug }
	});

	if (loading) {
		return <LoadingPage />;
	}
	if (error) {
		console.log('ProductDetail error', error);
		return <p>Error loading ProductDetail</p>;
	}

	let showGoBackToProductsLink = false;
	if (props.history && props.history.location && props.history.location.state && props.history.location.state.referringUrl) {
		showGoBackToProductsLink = true;
	}

	const GoBack = () => {
		props.history.goBack();
	}

	return (
		<section className={`product-detail`}>
			<div className={`product-detail__menu-spacer`} />
			<div className={`product-detail__inner`}>
				<ErrorBoundary>
					<ProductBody {...data[`productBy`]}
						showGoBackToProductsLink={showGoBackToProductsLink}
						GoBack={GoBack} />
				</ErrorBoundary>
			</div>
		</section>
	)
}

export default ProductDetail;
