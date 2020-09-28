import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingPage from '../../components/LoadingPage';
import Page404 from '../../pages/404';
import PageBody from "./PageBody";
import FLEX_CONTENT_QUERY from "../../queries/FlexibleQuery";
import SEO_QUERY_PARTIAL from "../../queries/SEOQuery";

const FAMILY_DETAIL_QUERY = gql`
	query FAMILY_DETAIL_QUERY($slug: String!) {
		productFamilyBy(uri: $slug) {
			title
			uri
			${FLEX_CONTENT_QUERY('ProductFamily')}
			${SEO_QUERY_PARTIAL}
		}
	}
`;

const FamilyDetail = props => {
	const { slug } = props.match.params;
	let route = slug;

	const { loading, error, data } = useQuery(FAMILY_DETAIL_QUERY, {
		variables: { slug: route }
	});

	if (loading) {
		return <LoadingPage />;
	}
	if (error) {
		console.error('FamilyDetail error', error);
		return <p>Error loading FamilyDetail.</p>;
	}
	if (!data.productFamilyBy) return <Page404 />;

	return (
		<div className={`single-page`}>
			<ErrorBoundary>
				<PageBody {...data.productFamilyBy} />
			</ErrorBoundary>
		</div>
	);
}

export default FamilyDetail;
