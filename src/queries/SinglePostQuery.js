import gql from 'graphql-tag';
import SEO_QUERY_PARTIAL from './SEOQuery';

// NOTE:: postId is used to filter out the current post in RecentPostsForCategory when auto-populating resources on blog page (REF: RTR-143)
const SINGLE_POST_QUERY = () => (
	gql`
		query SINGLE_POST_QUERY($postSlug: String!) {
			postBy (uri:$postSlug) {
				postId
				title
				content
				date
				featuredImage {
					__typename
					id
					mediaItemUrl
				}
				lead_gen_settings {
					showForm
					slideOutAreaText
					backgroundImage {
						mediaItemUrl
					}
				}
				singlePostFields {
					author
				}
				${SEO_QUERY_PARTIAL}
				categories {
					edges {
					  node {
						name
					  }
					}
				}
				resourcesCta {
					resources {
					  ... on Post {
						id
						title
						link
						excerpt
					  }
					}
					heading
				}
			}
		}
	`
);

export default SINGLE_POST_QUERY;
