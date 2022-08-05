import React, {useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { gql, useLazyQuery } from '@apollo/client';
import { CircleLoader } from 'react-spinners';
import PostCard from '../PostCard';

const POSTS_BY_AUTHOR = gql`
  query PostByAuthor($slug: String!) {
    posts(where: {authorName: $slug}) {
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
    }
  }
`;

const PostByAuthor = () => {

  const [getPosts, result] = useLazyQuery(POSTS_BY_AUTHOR);

  useEffect(() => {
    const showPosts = (slug) => {
      getPosts({variables: {'slug': '"' + slug + '"'}});
    };
    const slug = '"'+window.location.href.split('=')[1]+'"';
    showPosts(slug);
  }, []);

  const paintCards = () => result.data.posts.edges.map(post => <PostCard post={post.node} key={uuidv4()}/>);

  if(result.error) return <h2>Error: {result.error.message}</h2>

  if(result.loading) return <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>

  if(result.data) return <div>{paintCards()}</div>;
};

export default PostByAuthor;
