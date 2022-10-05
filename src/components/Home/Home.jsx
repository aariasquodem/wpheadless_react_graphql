import React, {useState} from "react";
import {useQuery} from '@apollo/client';
import {CircleLoader} from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';
import { ALL_POSTS } from "../../graphql/queries";
import PostCard from '../PostCard';

const numOfPosts = 2;

const Home = () => {

  const {data, loading, error, fetchMore} = useQuery(ALL_POSTS, {
    variables:{first: numOfPosts, after: null, before: null}
  });

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
    }else{
      setNoMore('There are no more posts');
    }
  };

  if(error) return <h2>{error.message}</h2>

  return <>
          {loading
            ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#1a87c7'}  size={100}/></div>
            : <>
                <div className="card-container">
                  {paintCards()}
                </div> 
                <div>
                  <p className="no-more">{noMore}</p>
                  <button onClick={hasNextPage} className='more-btn'>+</button>
                </div>
              </>
            }
        </>
};

export default Home;
