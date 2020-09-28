import { CategoriesToString } from '../../utils/CategoryHelpers';
import * as ResourceConstants from './ResourceConstants';

export const MakeGenericResourceFromResourceNode = (node, resourceType, useResourceTypeAsTags) => {
	console.log('node', node);
	console.log('resourceType', resourceType);
	console.log('useResourceTypeAsTags', useResourceTypeAsTags);
	let resourceDownloadUrl = "";

	if (resourceType.PostType === ResourceConstants.Articles.PostType) {
		resourceDownloadUrl = node.link;
	}
	if (resourceType.PostType === ResourceConstants.Podcasts.PostType) {
		if (node.podcast_details && node.podcast_details.podcastUrl) {
			resourceDownloadUrl = node.podcast_details.podcastUrl;
		}
	} else if (resourceType.PostType === ResourceConstants.Videos.PostType) {
		if (node.video_resource && node.video_resource.youtubeUrl) {
			resourceDownloadUrl = node.video_resource.youtubeUrl;
		}
	} else if (resourceType.PostType === ResourceConstants.Guides.PostType) {
		if (node.single_guide_resources && node.single_guide_resources.guideType  === "url") {
			resourceDownloadUrl = node.single_guide_resources.guideLink;
		} else if(node.single_guide_resources && node.single_guide_resources.guideType  === "pdf" && node.single_guide_resources.resourceDownload.mediaItemUrl) {
			resourceDownloadUrl = node.single_guide_resources.resourceDownload.mediaItemUrl;
		}
	} else {
		if (node.single_resource && node.single_resource.resourceDownload && node.single_resource.resourceDownload.mediaItemUrl) {
			resourceDownloadUrl = node.single_resource.resourceDownload.mediaItemUrl;
		}
		 
	}

	let tagListing = resourceType.SingularName;
	if (!useResourceTypeAsTags) {
		tagListing = CategoriesToString(node.categories);
	}

	const genericResource = {
		title: node.title,
		date: node.date,
		excerpt: node.excerpt,
		featuredImage: node.featuredImage,
		tagListing: tagListing,
		resourceDownloadUrl: resourceDownloadUrl,
		resourceType: resourceType
	}

	return genericResource;
}

export const BuildGenericResourcesFromNodes = (nodes, resourceType, useResourceTypeAsTags) => {
	let genericResources = [];
	for (let i = 0; i < nodes.length; i++) {
		let node = nodes[i];
		const genericResource = MakeGenericResourceFromResourceNode(node, resourceType, useResourceTypeAsTags);

		genericResources.push(genericResource);
	}

	// console.log('genericResources', genericResources);
	return genericResources;
}
