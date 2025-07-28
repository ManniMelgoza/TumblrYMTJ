import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
// import { Link } from "react-router-dom";
// import PostDetailPage from "../PostDetailPage/PostDetailPage";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/');
  };


    const goToProfile = () => {
      navigate('/profile');
    }

  return (
    <>
      {/* <button onClick={toggleMenu}>
        <FaUserCircle />
      </button> */}
      <div className="profile-button-wrapper">
      <button onClick={toggleMenu} className='profile-button'>
        <FaUserCircle />
      </button>
      </div>
     

      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>
                {/* TODO PICK UP HERE */}
                <div className="dropdown-item">
                <button onClick={goToProfile}>{ user.username }</button>
                {/* <Link className="" to="/profile"> { user.username } </Link> */}
                </div>
              </li>
              <li><div className="dropdown-item">{user.email}</div></li>
              <li>
                <div className="dropdown-item">
                <button onClick={logout}>Log Out</button>
                </div>
              </li>
            </>
          ) : (
            <>
            <li>
              <div className="dropdown-item">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              </li>
              <li>
                <div className="dropdown-item">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
