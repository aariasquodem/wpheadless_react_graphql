import React, {useEffect, useState} from 'react';
import { CircleLoader } from 'react-spinners';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import CommentCard from '../CommentCard';

const POST_COMMENT = gql`
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

const POST_DETAIL = gql`
  query PostById($id: ID!) {
    post(id: $id) {
      author {
        node {
          name
          slug
        }
      }
      content
      comments(where: {orderby: COMMENT_DATE, order: ASC}, first: 100) {
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

const PostDetail = () => {

  const [getPost, result] = useLazyQuery(POST_DETAIL);
  const [postComment] = useMutation(POST_COMMENT, {
    refetchQueries: [{ query: POST_DETAIL }, 'PostById']
  });
  const [error, setError] = useState('');
  const [lastComment, setLastComment] = useState({});

  useEffect(() => {
    const showPost = (id) => {
      getPost({variables: {'id': '"' + id + '"'}});
    };
    const id = '"'+window.location.href.split('=')[1]+'"';
    showPost(id);
  }, [lastComment]);

  const paintComments = () => result.data.post.comments.nodes.map((comment, i) =><CommentCard comment={comment} key={uuidv4()}/>);

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorName = e.target.elements.author.value;
    const contentBody = e.target.elements.content.value;
    const comment = {'author':{'node':{'name': authorName}} , 'id': uuidv4(), 'content': contentBody};
    if(authorName.length > 0 && contentBody.length > 0 ){
      postComment({ variables: {'commentOn': result.data.post.databaseId, 'content': contentBody, 'author': authorName}});
      setError('');
      setLastComment(comment);
    }else{
      setError('All fields must be completed');
    };
    e.target.reset();
  }

  if(result.error) return <h2>Error: {result.error.message}</h2>

  if(result.loading) return <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>

  if(result.data){

    return <>
            <div className="article-body">
              <h2>{result.data.post.title}</h2>
              <Link to={`/postby/?author=${result.data.post.author.node.slug}`}><h5>{result.data.post.author.node.name}</h5></Link>
              <img src={result.data.post.featuredImage.node.mediaItemUrl} alt={result.data.post.featuredImage.node.altText} />
              <p>{result.data.post.content.replace( /(<([^>]+)>)/ig, '')}</p>
            </div>
            <div className='article-comments'>
              <h3>Comments</h3>
              {paintComments()}
              <form onSubmit={handleSubmit}>
                <div className="author-comment">
                  <label htmlFor="author"><b>Name:</b> </label>
                  <input type="text" name="author"/>
                </div>
                <div className="content-comment">
                  <label htmlFor="content"><b>Comment:</b> </label>
                  <textarea name="content" rows="4" cols="50"/>
                </div>
                <p className='error'>{error}</p>
                <input type="submit" value="Send" className="send-comment"/>
              </form>
            </div>
          </>
  }
};

export default PostDetail;
