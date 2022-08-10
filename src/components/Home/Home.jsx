import React, {useState} from "react";
import {gql, useQuery} from '@apollo/client';
import {CircleLoader} from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';
import PostCard from '../PostCard';

const ALL_POSTS = gql`
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

const numOfPosts = 2;

const Home = () => {

  const {data, loading, error, fetchMore} = useQuery(ALL_POSTS, {
    variables:{first: numOfPosts, after: null, before: null}
  });

  const [pageNum, setPageNum] = useState(1);

  const paintCards = () => data.posts.nodes.map(post=> <PostCard post={post} key={uuidv4()}/>);

  if(error) return <h2>{error.message}</h2>

  const hasNextPage = () => {
    if(data.posts.pageInfo.hasNextPage === true){
      fetchMore({
        variables: {after: data.posts.pageInfo.endCursor, before: null},
        updateQuery: (prevResult, {fetchMoreResult}) => {
          return fetchMoreResult
        }
      });
      setPageNum(pageNum+1);
    }else{
      console.log('No next page');
    }
  };

  const hasPrevPage = () => {
    if(data.posts.pageInfo.hasPreviousPage === true){
      fetchMore({
        variables: {after: null, before: data.posts.pageInfo.startCursor},
        updateQuery: (prevResult, {fetchMoreResult}) => {
          return fetchMoreResult
        }
      });
      setPageNum(pageNum-1);
    }else{
      console.log('No prev page');
    }
  };

  return <>
          {loading
            ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>
            : <div>
                {paintCards()}
                <div>
                  <button onClick={hasPrevPage}>Prev</button>
                  <p>{pageNum}</p>
                  <button onClick={hasNextPage}>Next</button>
                </div>
              </div>
            }
        </>
};

export default Home;
