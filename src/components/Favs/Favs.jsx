import React, {useEffect, useContext, useState} from "react";
import {userContext} from '../../context/userContext';
import {db} from '../../firebase';
import { doc, getDoc, arrayRemove } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import FavouritesCard from '../FavouritesCard';

const Favs = () => {

  const [favouritesPosts, setFavouritesPosts] = useState([]);
  const {loggedUid} = useContext(userContext);

  useEffect(() => {
    
    const getDocs = async() =>{
      const docRef = doc(db, "users", loggedUid);
      const docSnap = await getDoc(docRef);
      const docArr = docSnap._document.data.value.mapValue.fields.favs.arrayValue.values;
      const docFav = docArr.map(element => {
        return {
          'title': element.mapValue.fields.title.stringValue,
          'img': element.mapValue.fields.img.stringValue,
          'postid': element.mapValue.fields.id.stringValue,
        }
      })
      setFavouritesPosts(docFav);
    };
    getDocs();
  }, []);

  // const deletePost = (i) => {
  //   const cleanedPosts = favouritesPosts.filter((post,j)=>j!==i);
  //   setFavouritesPosts(cleanedPosts);
  // };

  const paintCards = () => favouritesPosts.map(favPost=> <FavouritesCard favPost={favPost} key={uuidv4()}/>);

  return <div>{paintCards()}</div>;
};

export default Favs;
