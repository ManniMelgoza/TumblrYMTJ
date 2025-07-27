import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = await dispatch(thunkLogin({ email, password }));

  if (data?.errors) {
    setErrors(data.errors);
  } else {
    closeModal();
  }
};



  const handleSubmitDEMO = async () => {
  const data = await dispatch(thunkLogin({
    email: "demo@aa.io",
    password: "password"
  }));

  if (data?.errors) {
    setErrors(data.errors);
  } else {
    closeModal();
    navigate("/");
  }
};

  return (
    <>
    <div className="form-page">
      <h1 className='log-in-text'>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className='input-label'>
          Email
          <input
            type="text"
            className='input-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className='input-label'>
          Password
          <input
            type="password"
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" className='submit-button'
        >Log In</button>
        {/* DEMO USER  */}

        <button type="button" onClick={handleSubmitDEMO} className='demo-user'>Demo User</button>

        {/* <a
        href="#"
        className='demo-user'
        onClick={() =>
          dispatch(thunkLogin.login({ email: "demo@aa.io", password: 'password'}))
          .then(closeModal)}>
          Demo User</a> */}

      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
