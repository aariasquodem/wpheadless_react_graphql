import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {userContext} from '../../context/userContext';

const Login = () => {

  const {setLogged} = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const user = {'email': email, 'password': password};
    setLogged(true);
    navigate('/');
  };

  return <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email"/>
            </div>
            <div>
              <label htmlFor="pass">Password: </label>
              <input type="password" name="pass"/>
            </div>
            <input type="submit" value={"Login"}/>
          </form>
          <p>Still haven't and account? <Link to={'/signup'}>Sign Up here</Link></p>
        </div>;
};

export default Login;
