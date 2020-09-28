import React from "react";
import PageBody from "./PageBody";
import Page404 from '../../pages/404';
import FLEX_CONTENT_QUERY from "../../queries/FlexibleQuery";
import SEO_QUERY_PARTIAL from "../../queries/SEOQuery";
import { useQuery } from '@apollo/react-hooks';
import ErrorBoundary from '../../components/ErrorBoundary';
import gql from 'graphql-tag';
import LoadingPage from '../../components/LoadingPage';

const BRAND_DETAIL_QUERY = gql`
	query BRAND_DETAIL_QUERY($slug: String!) {
		productBrandBy(uri: $slug) {
			title
			uri
			${FLEX_CONTENT_QUERY('ProductBrand')}
			${SEO_QUERY_PARTIAL}
		}
	}
`;

const BrandDetail = props => {
	const { slug } = props.match.params;
	let route = slug;

	const { loading, error, data } = useQuery(BRAND_DETAIL_QUERY, {
		variables: { slug: route }
	});

	if (loading) {
		return <LoadingPage />;
	}
	if (error) {
		console.error('BrandDetail error', error);
		return <p>Error loading BrandDetail.</p>;
	}
	if (!data.productBrandBy) return <Page404 />;

	return (
		<div className={`single-page`}>
			<ErrorBoundary>
				<PageBody {...data.productBrandBy} />
			</ErrorBoundary>
		</div>
	);
}

export default BrandDetail;
