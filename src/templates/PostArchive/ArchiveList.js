import React from 'react';
import gql from 'graphql-tag';
import ArchiveListContent from './ArchiveListContent';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner';
import SEO_QUERY_PARTIAL from '../../queries/SEOQuery';
import { useQuery } from '@apollo/react-hooks';

const POST_ARCHIVE_QUERY = gql`
	query POST_ARCHIVE_QUERY($after:String!, $search:String!, $category:String!) {
		posts(after: $after, first: 10, where: { categoryName: $category, search: $search }) {
			nodes {
				title
				featuredImage {
					srcSet
					title
					altText
					mediaItemUrl
				}
				link
				excerpt
				${SEO_QUERY_PARTIAL}
				categories {
					edges {
					  node {
						name
					  }
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;

const PostArchive = props => {
	const { searchTerm } = props;
	const { category } = props;

	const {
		loading,
		error,
		data,
		fetchMore
	} = useQuery(POST_ARCHIVE_QUERY, {
		variables: {
			after: "",
			search: searchTerm || "",
			category: category || ""
		}
	});

	if (loading) {
		return <LoadingSpinner />
	}
	if (error) {
		console.error('ArchiveList error', error);
		return (
			<p>Error loading ArchiveList</p>
		);
	}
	if (!data.posts) return <p>No posts found.</p>;

	const { hasNextPage, endCursor } = data.posts.pageInfo;

	return (
		<>
			<ErrorBoundary>
				<ArchiveListContent
					{...data.posts}
				/>
			</ErrorBoundary>
			{ hasNextPage ? (
				<button
					onClick={() => {
						fetchMore({
							variables: {
								after: endCursor,
								search: searchTerm || ""
							},
							updateQuery: (prev, { fetchMoreResult }) => {
								if (!fetchMoreResult) return prev;
								return {
									...fetchMoreResult,
									posts: {
										...fetchMoreResult.posts,
										nodes: [
											...prev.posts.nodes,
											...fetchMoreResult.posts.nodes
										]
									}
								}
							}
						})
					}}
					className={`template-archive-post__load-more`}
				>
					Load More
				</button>
			) : null }
		</>
	);
}

export default PostArchive;
