import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signup from "../images/signup.png";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  //   Navigate
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // create user with email and password
  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  // check user
  if (user) {
    navigate(from, { replace: true });
  }

  // For email
  const handleEmail = (e) => {
    const emailRegexValidate = /\S+@\S+\.\S+/;
    const validatedEmail = emailRegexValidate.test(e.target.value);
    if (validatedEmail) {
      setUserInfo({ ...userInfo, email: e.target.value });
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Invalid Email" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };
  // For Password
  const handlePassword = (e) => {
    const passwordRegexValidate = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //Minimum eight characters, at least one letter and one number
    const validatedPassword = passwordRegexValidate.test(e.target.value);
    if (validatedPassword) {
      setUserInfo({ ...userInfo, password: e.target.value });
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({
        ...errors,
        password:
          "Minimum eight characters, at least one letter and one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  // For confirm password
  const handleConfirmPassword = (e) => {
    if (e.target.value === userInfo.password) {
      setUserInfo({ ...userInfo, confirmPassword: e.target.value });
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({ ...errors, password: "Passwords does not match" });
      setUserInfo({ ...userInfo, confirmPassword: "" });
    }
  };
  // Register Function
  const handleRegister = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    //Going to MyItems will redirect to login page.
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl mr-1.5 mt-4 px-3">
        <div className="card-body">
          <img src={signup} style={{ height: "100%" }} alt="" />
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl px-3">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">SIGN UP</h2>
          <form onSubmit={handleRegister}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                onBlur={handleEmail}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
                onBlur={handlePassword}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
                onBlur={handleConfirmPassword}
              />
            </div>
            <input
              className="btn w-full max-w-xs mt-4"
              type="submit"
              value="SiGNUP"
            />
          </form>

          <p>
            <small>
              Already Have An Account?{" "}
              <Link className="text-primary" to="/login">
                Login
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
