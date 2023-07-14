import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    let email = "demo@aa.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/")
    }
  }

  return (
    <div id='login-page-wrapper'>
      <h1>Twintendo Account</h1>
      <div id='login-box'>
        <form id='login-form' onSubmit={handleSubmit}>

            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}


            <input
              type="text"
              value={email}
              placeholder="E-mail address/Sign-in ID"
              onChange={(e) => setEmail(e.target.value)}
              required
            />


            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          <button type="submit">Sign in</button>
          <div>
            <div>Sign in with</div>
            <button onClick={demoUser}>Demo User</button>
          </div>
          <div>Don't have an account?</div>
          <button onClick={() => history.push('/signup')}>Create a Twintendo Account</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
