import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import ErrorBoundary from '../ErrorBoundary';
import RightArrow from '../../assets/svgs/right-arrow';
import { CategoriesToString } from '../../utils/CategoryHelpers';
import { UnescapeText } from '../../utils/TextHelpers';
import { MakeRelativePath } from '../../utils/UrlUtils';

const RecentPosts = props => {

	const PostCountToShow = 2;

	const RECENT_POSTS_QUERY = gql`
		query GET_POSTS($first: Int, $after: String) {
			posts(first: $first, after: $after) {
				pageInfo {
					hasNextPage
					endCursor
				}
				edges {
					cursor
					node {
						id
						title
						date
						categories {
							edges {
							  node {
								name
							  }
							}
						}
						excerpt
						link
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(RECENT_POSTS_QUERY, {
		variables: {
			first: PostCountToShow,
			after: null
		}
	});

	if (loading) {
		return <p></p>
	}
	if (error) return <p>Error loading recent posts</p>;
	if (!data.posts.edges) return <p>Error loading recent posts data</p>;

	const edges = data.posts.edges;

	return (
		<ErrorBoundary message={`Unable to load recent posts`}>
			<div className='recent-posts'>
				<div className='recent-posts__listing'>
					{
						edges.map(post => (
							<div key={`post-${post.node.id}`} className='recent-posts__listing__item'>
								<div className='recent-posts__listing__item__category'><span className="small">{CategoriesToString(post.node.categories)}</span></div>
								<Link className='recent-posts__listing__item__heading'
									to={`${MakeRelativePath(post.node.link)}`}>
									<h6 className='h7'>{UnescapeText(post.node.title)}</h6>
								</Link>
								<div className='recent-posts__listing__item__body'
									dangerouslySetInnerHTML={{__html: post.node.excerpt}} />
								<Link to={`${MakeRelativePath(post.node.link)}`}>
									<RightArrow />
								</Link>
							</div>
						))
					}
				</div>
			</div>
		</ErrorBoundary>
	)
}

export default RecentPosts;
