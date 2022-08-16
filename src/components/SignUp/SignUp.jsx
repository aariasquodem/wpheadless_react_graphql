import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from '../../context/userContext';
import {db, auth} from '../../firebase';
import { setDoc,getDoc, doc } from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";

const SignUp = () => {

  const {setLogged, setLoggedUserName} = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_\-])(?=.{8,})/;
    if(regexPassword.test(password)){
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          'username': username,
          'email': email
        });
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setError('');
        navigate('/');
        setLogged(true);
        setLoggedUserName(docSnap._document.data.value.mapValue.fields.username.stringValue);
      } catch (error) {
        console.log('Error:', error);
        setError('Invalid user or password');
      }
    } else{
      setError('Password must contain at least 8 alphanumeric characters, 1 uppercase letter and a special character');
    }
  };

  return <div className="form">
          <form onSubmit={handleSubmit} className="signup">
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
            <p className="error">{error}</p>
            <input type="submit" value={"Sign Up"}/>
          </form>
        </div>;
};

export default SignUp;
