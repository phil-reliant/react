import React from "react";
import { Link } from 'react-router-dom';
import ErrorBoundary from "../../components/ErrorBoundary";
import ResourceItem from './ResourceItem';
import { MakeGenericResourceFromResourceNode } from './ResourceUtilities';
import * as ResourceConstants from './ResourceConstants';

const ResourceSection = ({
	resourceType,
	resourceData,
	onShowAllOfResourceType
}) => {

	// console.log('resourceData', resourceData);

	if (!resourceData || resourceData.length === 0) {
		console.warn(`ResourceSection for ${resourceType} found 0 results, hiding section.`);
		return <></>
	}

	const baseClass = `resource-section`;
	return (
		<div className={`${baseClass} container`}>
			<div className={`row`}>
				<div className={`col-12`}>
					<h5 className={`${baseClass}__header`}>Featured {resourceType.PluralName}</h5>
				</div>
			</div>

			<div className={`row ${baseClass}__results-wrapper`}>
				<ErrorBoundary message={`Unable to load resources`}>
					{
						resourceData.map((node, index) => {
							const genericResource = MakeGenericResourceFromResourceNode(node, resourceType, "", false);
							return (
								<ResourceItem
									key={`ri-${index}`}
									title={genericResource.title}
									date={genericResource.date}
									excerpt={genericResource.excerpt}
									featuredImage={genericResource.featuredImage}
									tagListing={genericResource.tagListing}
									resourceDownloadUrl={genericResource.resourceDownloadUrl}
									resourceType={genericResource.resourceType} 
								
									/>
							);
						})
					}
				</ErrorBoundary>
			</div>
			<div className={`row`}>
				<div className={`col-12`}>
					{
						// If we have any resources then we'll show a 'See All' link
						// If it is for blogs, that link redirects to the blog VS adjusting the resource type filter for other types
						(resourceData && resourceData.length > 0) ?
							(resourceType.PostType === ResourceConstants.Articles.PostType) ?
								<Link to="/blog"
									className={`${baseClass}__load-more`}>
										See All {resourceType.PluralName}
								</Link>
							:
								<button
									className={`${baseClass}__load-more`}
									onClick={() => {onShowAllOfResourceType(resourceType)}}>
									See All {resourceType.PluralName}
								</button>
						:
						<></>
					}
				</div>
			</div>
		</div>
	)
}

export default ResourceSection;
