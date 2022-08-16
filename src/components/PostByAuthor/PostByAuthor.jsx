import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery } from '@apollo/client';
import { CircleLoader } from 'react-spinners';
import PostCard from '../PostCard';
import { POSTS_BY_AUTHOR } from "../../graphql/queries";

const numOfPosts = 2;

const PostByAuthor = () => {

  const [getPosts, result] = useLazyQuery(POSTS_BY_AUTHOR);

  const [noMore, setNoMore] = useState('');

  useEffect(() => {
    const showPosts = (slug) => {
      getPosts({variables: {first: numOfPosts, 'slug': '"' + slug + '"'}});
    };
    const slug = '"'+window.location.href.split('=')[1]+'"';
    showPosts(slug);
  }, []);

  const paintCards = () => result.data.posts.edges.map(post => <PostCard post={post.node} key={uuidv4()}/>);

  const hasNextPage = () => {
    if(result.data.posts.pageInfo.hasNextPage === true){
      result.fetchMore({
        variables: {after: result.data.posts.pageInfo.endCursor, before: null},
        updateQuery: (prevResult, {fetchMoreResult}) => {
          fetchMoreResult.posts.edges = prevResult.posts.edges.concat(fetchMoreResult.posts.edges);
          return fetchMoreResult;
        }
      });
    }else{
      setNoMore('This author has no more posts');
    }
  };

  if(result.error) return <h2>Error: {result.error.message}</h2>

  if(result.loading) return <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>

  if(result.data) return <div>
                          {paintCards()}
                          <div>
                            <p className="no-more">{noMore}</p>
                            <button onClick={hasNextPage} className='more-btn'>+</button>
                          </div>
                        </div>;
};

export default PostByAuthor;
