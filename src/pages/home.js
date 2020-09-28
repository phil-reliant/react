import React from 'react';
import PostsSearch from '../components/PostsSearch';
import SEO from '../components/SEO';

const HomePage = (props) => (
	<>
		<SEO title={`Reliant Technology Homepage`} />
		<h2 className="title">
			WPGraphQL React test {' '}
			<span className="emoji" role="img" aria-label="rocket">🚀</span>
		</h2>
		<PostsSearch />
	</>
);

export default HomePage;
