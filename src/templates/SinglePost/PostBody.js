import React from 'react';
import PropTypes from 'prop-types';
import SEO from '../../components/SEO';
import moment from 'moment';
import { CategoriesToString, GetFirstCategoryName } from '../../utils/CategoryHelpers';
import PostSidebar from './PostSidebar';
import PostShareButtons from './PostShareButtons';
import RecentPostsForCategory from '../../components/RecentPostsForCategory';
import ResourcesCTA from '../../components/FlexibleContent/ResourcesCTA';

const PostBody = props => {
	const DefaultResourcesHeading = "Resources"; // used if resources are pulled in dynamically (VS specified by editor in post)
	const {
		postId,
		title,
		content,
		date,
		singlePostFields,
		seo,
		featuredImage
	} = props;
	const { author } = singlePostFields;

	const newDate = moment(date).format(`MMMM D, YYYY`);
	const categoryText = CategoriesToString(props.categories);

	// figure out the first category to pass to RecentPostsForCategory (shown if no resources specified)
	let firstCategory = GetFirstCategoryName(props.categories);

	// get the heading to use for the Resources Section (either a default if auto-populated, or pulled from ACF if editor specified on blog post)
	let resourcesHeading = DefaultResourcesHeading;
	if (props.resourcesCta && props.resourcesCta.heading){
		resourcesHeading = props.resourcesCta.heading;
	}

	const baseClass = `single-post-body`;
	const seoProps = { featuredImage, ...seo };
	return (
		<div className={baseClass}>
			<SEO {...seoProps} />
			<div className={`container ${baseClass}__inner`}>
				<div className={`row`}>
					<div
						className={
							`col-12
							col-lg-7
							${baseClass}__content-container`
						}
					>
						<div className={`${baseClass}__title-container`}>
							<span className={`subhead`}>{categoryText}</span>
							<h4 dangerouslySetInnerHTML={{__html: title}} />
							<span className={`post-date small`}>{newDate}</span>
							{ author ? (
								<>
									<span className={`post-span-divider`}>&bull;</span>
									<span className={`post-author small`}>{author}</span>
								</>
							) : null}
						</div>
						<div
							className={`${baseClass}__body`}
							dangerouslySetInnerHTML={{__html: content}}
						/>
						<div
							className={`${baseClass}__share-buttons`}
						>
							<PostShareButtons />
						</div>
					</div>
					<div
						className={
							`col-12
							col-lg-4
							${baseClass}__sidebar-container`
						}
					>
						<PostSidebar />
					</div>
				</div>
			</div>
			{
				// if the editor specified resource to show, then show them, otherwise show a RecentPostsForCategory module which will pull in recent related items
				(props.resourcesCta && props.resourcesCta.resources) ?
					<ResourcesCTA
						heading={resourcesHeading}
						resources={props.resourcesCta.resources} />
					:
					<RecentPostsForCategory
						heading={resourcesHeading}
						category={firstCategory}
						postIdToExclude={postId} />
			}
		</div>
	);

};

PostBody.propTypes = {
    title: PropTypes.string
}

export default PostBody;
