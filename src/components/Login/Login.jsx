import React from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const user = {'email': email, 'password': password};
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
