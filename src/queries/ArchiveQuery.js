import gql from 'graphql-tag';

const ARCHIVE_QUERY = (postType) => (
    gql`
        query ${postType.toUpperCase()}_ARCHIVE_QUERY {
            ${postType} {
                edges {
                    node {
                        title
                    }
                }
            }
        }
    `
);

export default ARCHIVE_QUERY;