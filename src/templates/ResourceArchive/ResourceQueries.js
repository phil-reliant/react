import SINGLE_RESOURCE_PARTIAL_GUIDE_QUERY from '../../queries/SingleResourcePartialGuideQuery';
import SINGLE_RESOURCE_PARTIAL_QUERY from '../../queries/SingleResourcePartialQuery';

const RESOURCE_COMMON_FOR_ALL_QUERY = `
						title
						date
						excerpt
						featuredImage {
							altText
							mediaItemUrl
						}
						categories {
							nodes {
								categoryId
								name
							}
						}
`;

export const GENERIC_RESOURCE_PARTIAL_QUERY = `
					nodes {
						${RESOURCE_COMMON_FOR_ALL_QUERY}
						${SINGLE_RESOURCE_PARTIAL_QUERY}
					}
`;
export const GUIDES_PARTIAL_QUERY = `
					nodes {
						${RESOURCE_COMMON_FOR_ALL_QUERY}
						${SINGLE_RESOURCE_PARTIAL_GUIDE_QUERY}
					}
`

export const ARTICLES_PARTIAL_QUERY = `
					nodes {
						${RESOURCE_COMMON_FOR_ALL_QUERY}
						link
					}
`

export const PODCASTS_PARTIAL_QUERY = `
					nodes {
						${RESOURCE_COMMON_FOR_ALL_QUERY}
						podcast_details {
							podcastUrl
						}
					}
`

export const VIDEOS_PARTIAL_QUERY = `
					nodes {
						${RESOURCE_COMMON_FOR_ALL_QUERY}
						video_resource {
							youtubeUrl
						}
					}
`


export const FEATURED_RESOURCE_QUERY = `
	query RESOURCE_QUERY {
		posts(where: {tag: "featured"}, first:3) {
			${ARTICLES_PARTIAL_QUERY}
		}
		caseStudies(where: {tag: "featured"}, first:3) {
			${GENERIC_RESOURCE_PARTIAL_QUERY}
		}
		infographics(where: {tag: "featured"}, first:3) {
			${GENERIC_RESOURCE_PARTIAL_QUERY}
		}
		podcasts(where: {tag: "featured"}, first:3) {
			${PODCASTS_PARTIAL_QUERY}
		}
		videos(where: {tag: "featured"}, first:3) {
			${VIDEOS_PARTIAL_QUERY}
		}
		whitePapers(where: {tag: "featured"}, first:3) {
			${GENERIC_RESOURCE_PARTIAL_QUERY}
		}
		guides(where: {tag: "featured"}, first:3) {
			${GUIDES_PARTIAL_QUERY}
	    }
	}
`
