import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ErrorBoundary from '../ErrorBoundary';
import ResourcesCTA from '../FlexibleContent/ResourcesCTA';

const RecentPostsForCategory = ({ heading, category, postIdToExclude }) => {
	// console.log('category', category);
	// console.log('postIdToExclude', postIdToExclude);

	// query for the first 2 items of a given category excluding the current post
	const RECENT_POSTS_FOR_CATEGORY_QUERY = gql`
		query RECENT_POSTS_FOR_CATEGORY_QUERY($category: String, $postIdToExclude: [ID]) {
			posts(where: {categoryName: $category, notIn: $postIdToExclude}, first: 2) {
				nodes {
					id
					postId
					title
					link
					excerpt
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(RECENT_POSTS_FOR_CATEGORY_QUERY, {
		variables: {
			category: category,
			postIdToExclude: postIdToExclude
		}
	});

	if (loading) {
		return <p></p>
	}
	if (error) {
		console.error('Error loading recent posts for category', error);
		return <p>Error loading recent posts for category</p>;
	}
	if (!data.posts.nodes) return <p>Error loading recent posts for category data</p>;

	return (
		<ErrorBoundary message={`Unable to load recent posts for category`}>
			<ResourcesCTA heading={heading} resources={data.posts.nodes} />
		</ErrorBoundary>
	)
}

export default RecentPostsForCategory;
