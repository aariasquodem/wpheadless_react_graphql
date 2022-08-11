import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from '../Home';
import PostDetail from '../PostDetail';
import Authors from '../Authors';
import PostByAuthor from '../PostByAuthor'
import Login from '../Login';
import SignUp from '../SignUp';

const Main = () => {
  return <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/post" element={<PostDetail/>}/>
            <Route path="/authors" element={<Authors/>}/>
            <Route path="/postby" element={<PostByAuthor/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>;
};

export default Main;
