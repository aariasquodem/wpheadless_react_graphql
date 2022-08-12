import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from '../../context/userContext';
import {db, auth} from '../../firebase';
import { setDoc, doc } from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";

const SignUp = () => {

  const {setLogged} = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.pass.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        'username': username,
        'email': email
      });
      setLogged(true);
      setError('');
      // navigate('/');
    } catch (error) {
      console.log('Error:', error);
      setError('Invalid user or password');
    }
  };

  return <div>
          <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="username">Username: </label>
              <input type="text" name="username"/>
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email"/>
            </div>
            <div>
              <label htmlFor="pass">Password: </label>
              <input type="password" name="pass"/>
            </div>
            <p>{error}</p>
            <input type="submit" value={"Sign Up"}/>
          </form>
        </div>;
};

export default SignUp;
