import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const signout = (e) => {
    e.preventDefault();
    closeMenu();
    dispatch(logout())
    history.push('/');
  };

  const login = (e) => {
    e.preventDefault();
    closeMenu();
    history.push("/login");
  };

  const signup = (e) => {
    e.preventDefault();
    closeMenu();
    history.push("/signup");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const body = document.querySelector("body")
  if (showMenu) body.style.overflow = 'hidden'
  else body.style.overflow = 'auto'
  const backClassName = "grey-back" + (showMenu ? "" : " hidden");

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
      ) : (
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
          Log in / Sign up
        </button>
      )}
      <div className={backClassName}>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <div id='yes-user-wrap'>
                <div className="right-modal-header">
                  <h2>Welcome User</h2>
                  <div>X</div>
                </div>
                <div className="right-modal-info">
                  <div id='yes-user-box'>
                    <img src='https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_300/Dev/Global%20Navigation/unauthd-asset.png'/>
                    <div>With a free account, you can</div>
                    <div>Shop online</div>
                    <div>Earn My Twintendo points</div>
                    <div>Save a Wish List</div>
                  </div>
                  <div className="user-info-links">
                    <button>Wish List</button>
                    <button>Order history</button>
                    <button>Address book</button>
                  </div>
                  <div className="user-info-links">
                    <button>My Twintendo</button>
                    <button>Redeem code</button>
                    <button>Account settings</button>
                  </div>
                  <button onClick={signout}>Sign Out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id='no-user-wrap'>
                <div className="right-modal-header">
                  <h2>Log in / Sign up</h2>
                  <div>X</div>
                </div>
                <div className="right-modal-info">
                  <div id='no-user-box'>
                    <img src='https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_300/Dev/Global%20Navigation/unauthd-asset.png'/>
                    <div>With a free account, you can</div>
                    <div>Shop online</div>
                    <div>Earn My Twintendo points</div>
                    <div>Save a Wish List</div>
                  </div>
                  <button onClick={login}>Log in</button>
                  <button onClick={signup}>Sign up</button>
                  <div className="user-info-links">
                    <button>Order Status</button>
                  </div>
                  <div className="user-info-links">
                    <button>My Twintendo</button>
                    <button>Redeem code</button>
                    <button>Account settings</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
