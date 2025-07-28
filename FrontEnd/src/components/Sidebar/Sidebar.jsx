import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCompass } from "react-icons/fa";
import { thunkGetAllPosts } from "../../redux/post";
import { useModal } from "../../context/Modal";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal";
import "./Sidebar.css";
import { useState } from "react";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.session?.user);
  const navigate = useNavigate();
  const { setModalContent } = useModal(); // usrModal hook build inside compenten 
  const [showAuthPrompt, setShowAuthPrompt] = useState(false); 

  const openLoginModal = () => {
    setShowAuthPrompt(false);
    setModalContent(<LoginFormModal />);
  };

  const openSignupModal = () => {
    setShowAuthPrompt(false);
    setModalContent(<SignupFormModal />);
  };

  const handleProfileClick = () => {
    if (loggedUser) {
      navigate('/profile');
    } else {
      setShowAuthPrompt(true);
    }
  };

  const handleCreatePostClick = () => {
    if (loggedUser) {
      navigate("/create");
    } else {
      setShowAuthPrompt(true);
    }
  };

  return (
    <div className="logoColumn">
      <div className="logoWrapper">
        <div
          className="logoImg"
          onClick={() => dispatch(thunkGetAllPosts())}
          style={{ cursor: "pointer" }}
        >
          <img src="/ReelQuotesLogo.gif" alt="Logo" />
        </div>
      </div>

      <div className="navButtons">
        <Link to="/" className="explore" onClick={() => dispatch(thunkGetAllPosts())}>
          <FaRegCompass /> Explore
        </Link>
        {loggedUser ? (
          <Link to="/create" className="newSpotLink postBtn">
            Create a Post
          </Link>
        ) : (
            <button
            className="newSpotLink postBtn"
            onClick={handleCreatePostClick}
            style={{ cursor: "pointer", background: "white", color: "black" }}
          >
            Create a Post
          </button>
        )}
        <button
          onClick={handleProfileClick}
          className="newSpotLink profileBtn"
          style={{ cursor: "pointer", background: "white", color: "black" }}
        >
          myProfile
        </button>
      </div>

      {/* Auth prompt modal for logged out users */}
      {showAuthPrompt && (
        <AuthPromptModal
          onClose={() => setShowAuthPrompt(false)}
          openLogin={openLoginModal}
          openSignup={openSignupModal}
        />
      )}

    </div>
  );
};

export default Sidebar;
