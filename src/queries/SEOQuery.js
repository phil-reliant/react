const SEO_QUERY_PARTIAL = `
	seo {
		title
		canonicalURL
		metaDesc
		metaKeywords
		metaRobotsNoindex
		metaRobotsNofollow
		metaRobotsAdvanced
		focuskw
		opengraphTitle
		opengraphDescription
		opengraphImage {
			__typename
			uri
			mediaItemUrl
		}
		twitterTitle
		twitterDescription
		twitterImage {
			__typename
			uri
			mediaItemUrl
		}
	}
`;

export default SEO_QUERY_PARTIAL;
