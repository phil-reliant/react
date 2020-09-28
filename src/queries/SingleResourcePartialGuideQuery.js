const SINGLE_RESOURCE_PARTIAL_GUIDE_QUERY = `
single_guide_resources {
    guideLink
    guideType
    resourceDownload {
      mediaItemUrl
      mediaItemId
      
    }
}
`;

export default SINGLE_RESOURCE_PARTIAL_GUIDE_QUERY;
