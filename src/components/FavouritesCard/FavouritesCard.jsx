import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {db} from '../../firebase';
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {userContext} from '../../context/userContext';

const FavouritesCard = ({changeFavsState, favPost}) => {

  const {loggedUid} = useContext(userContext);

  const removeFav = async() => {
    const article = {'title': favPost.title, 'img': favPost.img, 'id': favPost.postid};
    const docRef = doc(db, "users", loggedUid);
    await updateDoc(docRef, {
      favs: arrayRemove(article)
    });
    changeFavsState();
  }

  return <div className="fav-card">
          <button onClick={removeFav} className="trash-btn"></button>
          <Link to={`/post/?id=${favPost.postid}`}>
            <h3>{favPost.title}</h3>
          </Link>
          <img src={favPost.img} alt="post-img" className="fav-img"/>
        </div>;
};

export default FavouritesCard;
