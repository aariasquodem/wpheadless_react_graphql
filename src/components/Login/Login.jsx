import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {userContext} from '../../context/userContext';
import {db, auth} from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import {signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {

  const {setLogged, setLoggedUserName} = useContext(userContext);
  const navigate = useNavigate();
  const[error, setError] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const uid = user._tokenResponse.localId;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      setLogged(true);
      setLoggedUserName(docSnap._document.data.value.mapValue.fields.username.stringValue);
      setError('');
      navigate('/');
    } catch (error) {
      console.log('Error:', error);
      setError('Incorrect user or password');
    }
  };

  return <div className="form">
          <form onSubmit={handleSubmit} className="login">
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email"/>
            </div>
            <div>
              <label htmlFor="pass">Password: </label>
              <input type="password" name="pass"/>
            </div>
            <p className="error">{error}</p>
            <input type="submit" value={"Login"}/>
          </form>
          <p>Still haven't and account? <b><Link to={'/signup'} className="to-signup">Sign Up here</Link></b></p>
        </div>;
};

export default Login;
