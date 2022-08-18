import { gql} from '@apollo/client';

export const ALL_POSTS = gql`
  query AllPosts($first: Int!, $before: String, $after: String) {
    posts(first: $first, after: $after, before: $before) {
      nodes {
        author {
          node {
            name
            slug
            id
            username
          }
        }
        id
        title
        excerpt
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query AllAuthors {
    users {
      nodes {
        avatar {
          url
        }
        firstName
        lastName
        name
        nickname
        slug
      }
    }
  }
`;

export const POSTS_BY_AUTHOR = gql`
  query PostByAuthor($first: Int!, $after: String, $slug: String!) {
    posts(first: $first, after: $after, where: {authorName: $slug}) {
      edges {
        node {
          id
          author {
            node {
              id
              name
              slug
              username
            }
          }
          title
          excerpt
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const POST_DETAIL = gql`
  query PostById($id: ID!) {
    post(id: $id) {
      author {
        node {
          name
          slug
        }
      }
      content
      comments(where: {orderby: COMMENT_DATE, order: ASC}, first: 1000) {
        nodes {
          content
          author {
            node {
              name
            }
          }
          id
        }
      }
      title(format: RENDERED)
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      databaseId
    }
  }
`;