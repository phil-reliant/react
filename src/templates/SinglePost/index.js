import React from "react";
import PostBody from './PostBody';
import SINGLE_POST_QUERY from "../../queries/SinglePostQuery";
import { useQuery } from '@apollo/react-hooks';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingPage from '../../components/LoadingPage';

const SinglePost = props => {
	const { slug } = props.match.params;
	const { postType } = props;

	let query = SINGLE_POST_QUERY();
	const { loading, error, data } = useQuery(query, {
		variables: { postSlug: slug }
	});

	if (loading) {
		return <LoadingPage />;
	}
	if (error) {
		console.log('SinglePost error', error);
		return <p>Error loading SinglePost.</p>;
	}
	if (!data[`${postType}By`]) return <p>No posts found.</p>

	return (
		<section className={`single-post`}>
			<div className={'single-post__menu-spacer'}></div>
			<div className={`single-post__inner`}>
				<ErrorBoundary>
					<PostBody {...data[`${postType}By`]} />
				</ErrorBoundary>
			</div>
		</section>
	)
}

export default SinglePost;
