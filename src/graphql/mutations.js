import { gql} from '@apollo/client';

export const POST_COMMENT = gql`
    mutation CREATE_COMMENT($commentOn: Int!, $content: String!, $author: String!) {
        createComment(input: {
            commentOn: $commentOn, 
            content: $content, 
            author: $author
        }) {
            success
            comment {
                id
                content
                author {
                    node {
                    name
                    }
                }
            }
        }
    }
`;