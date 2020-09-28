// NOTE:: This page may be passed in `searchTerm` which will filter results. It can also be passed in
// `category`, which will limit posts by category

import React from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import ErrorBoundary from '../../components/ErrorBoundary';
import GlobalConstants from '../../GlobalConstants';
import ArchiveList from './ArchiveList';
import BlogHeaderImage from '../../assets/images/blog-lander-header@2x.jpg';
import PostSidebar from '../SinglePost/PostSidebar';
import SidebarSignup from '../SinglePost/SidebarSignup';
import SideBars9 from "../../assets/images/side-bars-9.png";
import { GetCategoryFriendlyName } from '../../utils/CategoryHelpers';
import { CATEGORY_QUERY_PARTIAL } from '../../queries/GetCategories';

const PostArchive = props => {
	const baseClass = `template-archive-post`;
	const {
		searchTerm,
		category
	} = props;

	const headerStyles = {
		backgroundImage: `url('${BlogHeaderImage}')`,
		backgroundSize: `cover`, 
		backgroundPosition: `center center`,
		backgroundRepeat: `no-repeat`
	};

	const CATEGORY_QUERY = gql`${CATEGORY_QUERY_PARTIAL}`;

	return (
		<section className={baseClass}>
			<div className={`${baseClass}__header`} style={headerStyles}>
				<img className={`side-bars`} src={SideBars9} alt={"Side Bars"} />
				<div className={`${baseClass}__header__inner container`}>
					{
						// if a category slug was provided, then search for the friendly name to display as the title,
						// otherwise lookup the global option for the blogArchiveTitle and show that instead
						category ?
							<Query query={CATEGORY_QUERY}>
								{({ loading, error, data }) => {
									let pageTitle = category;
									if (loading) {
										return <p></p>;
									}
									if (error) {
										console.error('PostArchive unable to get category friendly name!');
									} else {
										pageTitle = GetCategoryFriendlyName(data.categories, category);
									}
									return (
										<h3 className={`${baseClass}__title`}>{pageTitle}</h3>
									);
								}}
							</Query>
							:
							<h3 className={`${baseClass}__title`}>{GlobalConstants.pageTitlesAndCopy.blogArchive.title}</h3>
					}
				</div>
			</div>
			<div className={`${baseClass}__inner container`}>
				<div className={`row`}>
					<div className={`${baseClass}__post-archive-list col-lg-8`}>
						<ErrorBoundary>
							<ArchiveList searchTerm={searchTerm} category={category} />
						</ErrorBoundary>
					</div>
					<div className={`${baseClass}__sidebar-container col-lg-4`}>
						<PostSidebar />
					</div>
				</div>
				<div className={`row`}>
					<div className={`${baseClass}__post-archive-modile-signup col-12`}>
						<SidebarSignup />
					</div>
				</div>
			</div>
		</section>
	);
}

export default PostArchive;
