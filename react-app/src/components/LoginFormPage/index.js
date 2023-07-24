import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector} from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (password.length < 6) {
        setDisabled(true);
    } else {
        setDisabled(false);
    }
  }, [password]);

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
    <div id='login-page-wrapper' className="dodge-small-nav">
      <h1>Twintendo Account</h1>
      <div id='login-box'>
        <form id='login-form' onSubmit={handleSubmit}>

            {errors.map((error, idx) => (
              <li className='login-err' key={idx}>{error}</li>
            ))}


            <input
              type="text"
              value={email}
              placeholder="E-mail address"
              onChange={(e) => setEmail(e.target.value)}
            />


            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

          <button
            className={disabled? 'disabled-button': 'login-submit'}
            type="submit"
            disabled={disabled}
          >
          Sign in
          </button>
          <div className="sign-in-with">
            <p>Sign in with</p>
            <button id='demo1' onClick={demoUser1}>Demo User 1</button>
            <button id='demo2' onClick={demoUser2}>Demo User 2</button>
          </div>
          <div id='signup-link'>Don't have an account?</div>
          <button
            id='create-account'
            onClick={() => history.push('/signup')}
          >
            Create a Twintendo Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
