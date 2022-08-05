import React from "react";
import {gql, useQuery} from '@apollo/client';
import {CircleLoader} from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';
import PostCard from '../PostCard';

const ALL_POSTS = gql`
  query AllPosts {
    posts {
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
    }
  }
`

const Home = () => {

  const {data, loading, error} = useQuery(ALL_POSTS);

  const paintCards = () => data.posts.nodes.map(post=> <PostCard post={post} key={uuidv4()}/>)

  if(error) return <h2>{error.message}</h2>

  return <>
          {loading
            ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>
            : <div>{paintCards()}</div>
            }
        </>
};

export default Home;
