import React from "react";
import "./AuthPromptModal.css";


const AuthPromptModal = ({ onClose, openLogin, openSignup }) => {
  return (
    <div id="modal" onClick={onClose}>
      <div id="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-prompt-message">
          Please log in or sign up to view your profile.
        </div>
        <div className="auth-prompt-buttons">
          <button
            className="login-btn"
            onClick={() => {
              openLogin();
              onClose();
            }}
          >
            Log In
          </button>
          <button
            className="signup-btn"
            onClick={() => {
              openSignup();
              onClose();
            }}
          >
            Sign Up
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthPromptModal;

