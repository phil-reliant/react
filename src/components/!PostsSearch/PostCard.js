import React from 'react';

// Helper function for formatting dates.
const formatDate = date => new Date(date).toDateString();

const PostCard = ({ post }) => {

	const { name, /* slug, */ shortDescription, id, price, date } = post;

	return (
		<div key={id} className="post-card">
			<h3 className="post-card__heading">{name}</h3>
			<div dangerouslySetInnerHTML={{ __html: shortDescription }} />
			<p>{price}</p>
			<span className="post-card__detail">
				<span className="post-card__label">Date:</span> {formatDate(date)}
			</span>
		</div>
	);
};

export default PostCard;
