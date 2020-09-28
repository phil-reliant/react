import React from 'react';
import CategoriesListing from '../../components/CategoriesListing';
import PostSearch from './PostSearch';
import RecentPosts from '../../components/RecentPosts';
import SidebarSignup from './SidebarSignup';

const PostSidebar = props => {

	const baseClass = `single-post-body__sidebar`;

	return (
		<div className={baseClass}>
			<PostSearch />
			<SidebarSignup />
			<CategoriesListing />
			<RecentPosts />
		</div>
	)
}

export default PostSidebar;
