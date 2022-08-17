import React, {useEffect, useState, useContext} from 'react';
import { CircleLoader } from 'react-spinners';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useLazyQuery } from '@apollo/client';
import DOMPurify from 'dompurify';
import {userContext} from '../../context/userContext';
import {POST_COMMENT} from '../../graphql/mutations';
import {POST_DETAIL} from '../../graphql/queries';
import CommentCard from '../CommentCard';
import {db} from '../../firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const PostDetail = () => {

  const {logged, loggedUserName, loggedUid} = useContext(userContext);

  const [getPost, result] = useLazyQuery(POST_DETAIL);
  const [postComment] = useMutation(POST_COMMENT, {
    refetchQueries: [{ query: POST_DETAIL }, 'PostById']
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const showPost = (id) => {
      getPost({variables: {'id': '"' + id + '"'}});
    };
    const id = '"'+window.location.href.split('=')[1]+'"';
    showPost(id);
  }, []);

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(result.data.post.content)
  });

  const paintComments = () => result.data.post.comments.nodes.map((comment, i) =><CommentCard comment={comment} key={uuidv4()}/>);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentBody = e.target.elements.content.value;
    if(logged && contentBody.length > 0 ){
      postComment({ variables: {'commentOn': result.data.post.databaseId, 'content': contentBody, 'author': loggedUserName}});
      setError('');
    }else if(!logged){
      setError('You must be logged to send comments');
    }else{
      setError("You can't send an empty comment");
    };
    e.target.reset();
  };

  const addToFav = async() => {
    const article = {'title': result.data.post.title, 'img': result.data.post.featuredImage.node.mediaItemUrl, 'id': window.location.href.split('=')[1]};
    const docRef = doc(db, "users", loggedUid);

    await updateDoc(docRef, {
      favs: arrayUnion(article)
    });
  };

  if(result.error) return <h2>Error: {result.error.message}</h2>

  if(result.loading) return <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>

  if(result.data){

    return <>
            <div className="article-body">
              {logged ? <button onClick={addToFav}>Fav</button> : <></>}
              <h2>{result.data.post.title}</h2>
              <Link to={`/postby/?author=${result.data.post.author.node.slug}`}><h5>{result.data.post.author.node.name}</h5></Link>
              <img src={result.data.post.featuredImage.node.mediaItemUrl} alt={result.data.post.featuredImage.node.altText} className="intro-img" />
              <div dangerouslySetInnerHTML={sanitizedData()}></div>
            </div>
            <div className='article-comments'>
              <h3>Comments</h3>
              {paintComments()}
              <form onSubmit={handleSubmit}>
                <div className="content-comment">
                  <label htmlFor="content"><b>Comment:</b> </label>
                  {logged ? <textarea name="content" rows="4" cols="50" /> : <textarea name="content" rows="4" cols="50" disabled/>}
                </div>
                <p className='error'>{error}</p>
                <input type="submit" value="Send" className="send-comment"/>
              </form>
            </div>
          </>
  }
};

export default PostDetail;
