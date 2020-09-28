import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import LoadingSpinner from '../LoadingSpinner';
import PostCard from "./PostCard";
import ErrorBoundary from "../ErrorBoundary";

const PRODUCTS_SEARCH_QUERY = gql`
	query PRODUCTS_SEARCH_QUERY($searchQuery: String!) {
		products(where: { search: $searchQuery }, first: 50) {
			edges {
				node {
					name
					slug
					shortDescription
					date
					id
					... on SimpleProduct {
						id
						name
						price
					}
					... on GroupProduct {
						id
						name
					}
					... on ExternalProduct {
						id
						name
						price
					}
					... on VariableProduct {
						id
						name
						price
					}
				}
			}
			pageInfo {
				hasNextPage
				startCursor
				hasPreviousPage
				endCursor
			}
		}
	}
`

const PostsList = ({ searchQuery }) => (
	<Query query={PRODUCTS_SEARCH_QUERY} variables={{ searchQuery }}>
		{({ loading, error, data }) => {
			if (loading) {
				return <LoadingSpinner />;
			}
			if (error) {
				console.error('PostsLists error', error);
				 return <p>Error loading PostsList</p>;
			}
			if (!data.products.edges.length) return <p>No matching products found.</p>;

			return data.products.edges.map(edge => {
				const { node: product } = edge;
				const { id } = product;

				return (
					<ErrorBoundary key={id}>
						<PostCard post={product} />
					</ErrorBoundary>
				);
			});
		}}
	</Query>
);

export default PostsList;
