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

  return <div>
          <button onClick={removeFav}>remove</button>
          <Link to={`/post/?id=${favPost.postid}`}>
            <h4>{favPost.title}</h4>
            <img src={favPost.img} alt="post-img" />
          </Link>
        </div>;
};

export default FavouritesCard;
