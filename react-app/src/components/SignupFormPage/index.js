import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp, login } from "../../store/session";
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, nickname, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const demoUser1 = async (e) => {
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

  const demoUser2 = async (e) => {
    e.preventDefault()
    let email = "marnie@aa.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/")
    }
  }

  return (
    <div id='signup-page-wrapper' className="dodge-small-nav">
      <h1>Create a Twintendo Account</h1>
      <div className="signup-box">
        <p>Login as a demo user instead</p>
        <div id='demo-signup'>
          <button id='demo-1' onClick={demoUser1}>Demo User 1</button>
          <button id='demo-2' onClick={demoUser2}>Demo User 2</button>
        </div>
      </div>
      <div className="signup-box">
        <form id='signup-form' onSubmit={handleSubmit}>
          <p>If you would like to create a Twintendo Account, please enter your information below.</p>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className="signup-input">
            <div>Nickname</div>
            <input
              type="text"
              value={nickname}
              placeholder="20 characters or less"
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </label>
          <label className="signup-input">
            <div>Username</div>
            <input
              type="text"
              value={username}
              placeholder="20 characters or less"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="signup-input">
            <div>Email</div>
            <input
              type="text"
              value={email}
              placeholder="E-mail address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="signup-input">
            <div>Password</div>
            <input
              type="password"
              value={password}
              placeholder="At least 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="signup-input">
            <div>Confirm password</div>
            <input
              type="password"
              value={confirmPassword}
              placeholder="At least 6 characters"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className='signup-submit' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
