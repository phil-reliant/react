import gql from 'graphql-tag';

const SINGLE_MENU_QUERY = gql`
    query SINGLE_MENU_QUERY($id: ID!) {
        menu(id:$id) {
            count
            id
            menuId
            name
            slug
            menuItems {
                nodes {
                    id
                    menuItemId
                    title
                    url
                    cssClasses
                    description
                    label
                    linkRelationship
                    target
                }
            }
        }
    }
`;

export default SINGLE_MENU_QUERY;