import React from "react";
import PageBody from "./PageBody";
import Page404 from '../../pages/404';
import FLEX_CONTENT_QUERY from "../../queries/FlexibleQuery";
import SEO_QUERY_PARTIAL from "../../queries/SEOQuery";
import { useQuery } from '@apollo/react-hooks';
import ErrorBoundary from '../../components/ErrorBoundary';
import gql from 'graphql-tag';

const SINGLE_PAGE_QUERY = gql`
    query SINGLE_PAGE_QUERY($slug: String!) {
        pageBy(uri: $slug) {
            title
						pageTemplate
						uri
            ${FLEX_CONTENT_QUERY('Page')}
            ${SEO_QUERY_PARTIAL}
        }
    }
`;

const SinglePage = props => {
	const { slug } = props.match.params;
	let route = slug;

	if (!slug) {
		route = `home`;
	}

	const { loading, error, data } = useQuery(SINGLE_PAGE_QUERY, {
		variables: { slug: route }
	});

	if (loading) {
		return <p style={{height: 100 + 'vh'}}></p>;
	}
	if (error) {
		console.error('SinglePage error', error);
		return <p>Error loading SinglePage.</p>;
	}
	if (!data.pageBy) return <Page404 />;

	return (
		<div className={`single-page`}>
			<ErrorBoundary>
				<PageBody {...data.pageBy} route={route} />
			</ErrorBoundary>
		</div>
	);
}

export default SinglePage;
