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
    body.style.overflow = 'auto'
    history.push("/login");
  };

  const signup = (e) => {
    e.preventDefault();
    closeMenu();
    body.style.overflow = 'auto'
    history.push("/signup");
  };

  const manage = (e) => {
    e.preventDefault();
    closeMenu();
    history.push("/current/products");
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
        <button className='profile-button' onClick={openMenu}>
          <img src={user.imageUrl ? user.imageUrl : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg'}/>
          {user.nickname}
        </button>
      ) : (
        <button className='profile-button' onClick={openMenu}>
          Log in / Sign up
        </button>
      )}
      <div className={backClassName}>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <div id='yes-user-wrap'>
                <div className="right-modal-header">
                  <h2>Welcome {user.nickname}</h2>
                  <i class="fa-solid fa-circle-xmark" onClick={closeMenu}></i>
                </div>
                <div className="right-modal-info">
                  <div id='yes-user-box'>
                    <div id='yes-user-info'>
                      <img src={user.imageUrl ? user.imageUrl : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg'}/>
                      <div>
                        <h2>{user.nickname}</h2>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div id='products-posted'>
                      <img src='https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_100/Design%20System/Component%20Library/Icon/my-nintendo-gold-coin.png'/>
                      <div>Products Posted</div>
                      <div className="bold">{user.products}</div>
                    </div>
                    <button id='manage-products' onClick={manage}>Manage Products</button>
                  </div>
                  <div id='yes-user-space'></div>
                  {/* <div className="user-info-links">
                    <button>Wish List</button>
                    <button>Order history</button>
                    <button>Address book</button>
                  </div>
                  <div className="user-info-links">
                    <button>My Twintendo</button>
                    <button>Redeem code</button>
                    <button>Account settings</button>
                  </div> */}
                  <button id='signout-button' onClick={signout}>
                    Sign Out
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id='no-user-wrap'>
                <div className="right-modal-header">
                  <h2>Log in / Sign up</h2>
                  <i class="fa-solid fa-circle-xmark" onClick={closeMenu}></i>
                </div>
                <div className="right-modal-info">
                  <div id='no-user-box'>
                    <img src='https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.0/c_scale,w_300/Dev/Global%20Navigation/unauthd-asset.png'/>
                    <div>With a free account, you can</div>
                    <div><i class="fa-solid fa-check"></i>Shop online</div>
                    <div><i class="fa-solid fa-check"></i>View products</div>
                    <div><i class="fa-solid fa-check"></i>Manage products</div>
                  </div>
                  <button id='login-button' onClick={login}>Log in</button>
                  <button id='signup-button' onClick={signup}>Sign up</button>
                  {/* <div className="user-info-links">
                    <button>Order Status</button>
                  </div>
                  <div className="user-info-links">
                    <button>My Twintendo</button>
                    <button>Redeem code</button>
                    <button>Account settings</button>
                  </div> */}
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
