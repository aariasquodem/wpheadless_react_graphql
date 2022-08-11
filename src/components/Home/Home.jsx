import React, {useState} from "react";
import {gql, useQuery} from '@apollo/client';
import {CircleLoader} from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';
import { ALL_POSTS } from "../../graphql/queries";
import PostCard from '../PostCard';

const numOfPosts = 2;

const Home = () => {

  const {data, loading, error, fetchMore} = useQuery(ALL_POSTS, {
    variables:{first: numOfPosts, after: null, before: null}
  });

  // const [pageNum, setPageNum] = useState(1);
  const [noMore, setNoMore] = useState('');

  const paintCards = () => data.posts.nodes.map(post=> <PostCard post={post} key={uuidv4()}/>);

  const hasNextPage = () => {
    if(data.posts.pageInfo.hasNextPage === true){
      fetchMore({
        variables: {after: data.posts.pageInfo.endCursor, before: null},
        updateQuery: (prevResult, {fetchMoreResult}) => {
          fetchMoreResult.posts.nodes = prevResult.posts.nodes.concat(fetchMoreResult.posts.nodes);
          return fetchMoreResult;
        }
      });
      // setPageNum(pageNum+1);
    }else{
      setNoMore('There are no more posts');
    }
  };

  // const hasPrevPage = () => {
  //   if(data.posts.pageInfo.hasPreviousPage === true){
  //     fetchMore({
  //       variables: {after: null, before: data.posts.pageInfo.startCursor},
  //       updateQuery: (prevResult, {fetchMoreResult}) => {
  //         return fetchMoreResult
  //       }
  //     });
  //     setPageNum(pageNum-1);
  //   }else{
  //     console.log('No prev page');
  //   }
  // };

  if(error) return <h2>{error.message}</h2>

  return <>
          {loading
            ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>
            : <div>
                {paintCards()}
                <div>
                  {/* <button onClick={hasPrevPage}>Prev</button>
                  <p>{pageNum}</p> */}
                  <p className="no-more">{noMore}</p>
                  <button onClick={hasNextPage} className='more-btn'>+</button>
                </div>
              </div>
            }
        </>
};

export default Home;
