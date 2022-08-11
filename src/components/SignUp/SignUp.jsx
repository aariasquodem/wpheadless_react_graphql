import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from '../../context/userContext';

const SignUp = () => {

  const {setLogged} = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const user = {'username': username, 'email': email, 'password': password};
    setLogged(true);
    navigate('/');
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
            <input type="submit" value={"Sign Up"}/>
          </form>
        </div>;
};

export default SignUp;
