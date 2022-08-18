import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {db, auth} from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

const Login = () => {

  const navigate = useNavigate();
  const[error, setError] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      navigate('/');
    } catch (error) {
      console.log('Error:', error);
      setError('Incorrect user or password');
    }
  };

  const authWithGoogle = async() => {
    try {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider).then(result => {
        const uid = result.user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = getDoc(docRef);
        if(!docSnap){
          setDoc(doc(db, "users", uid), {
            'username': result.user.displayName,
            'email': result.user.email,
            'favs': []
          });
          navigate('/');
        }else{
          navigate('/');
        }
        return result.user;
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }

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
          <button className="customGPlusSignIn" onClick={authWithGoogle}>
            <span className="icon"></span>
            <span className="buttonText">Google</span>
          </button>
          <p>Still haven't and account? <b><Link to={'/signup'} className="to-signup">Sign Up here</Link></b></p>
        </div>;
};

export default Login;
