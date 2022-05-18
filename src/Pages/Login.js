import React, { useEffect, useRef, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import login from "../images/login.png";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  // Google sign in
  const [signInWithGoogle, googleUser, loading2, googleError] =
    useSignInWithGoogle(auth);
  const emailRef = useRef("");

  //   Navigate
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // Login with react firebase hook
  const [signInWithEmail, user, loading, hookError] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  useEffect(() => {
    if (user || googleUser) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user, googleUser]);

  //   todoApp
  //   gJ99lUOgC4vmoCFC

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
        password: "Password Not Correct",
      });
      setUserInfo({ ...userInfo, password: "" });
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmail(userInfo.email, userInfo.password);
  };

  //   Reset Password
  const resetPassword = async () => {
    const email = emailRef.current.value;
    // console.log(email);
    await sendPasswordResetEmail(email);
    toast("Sent email");
  };
  useEffect(() => {
    const error = googleError;
    if (error) {
      switch (error?.code) {
        case "auth/invalid-email":
          toast("Wrong email typed !");
          break;
        case "auth/invalid-password":
          toast("Wrong password, try again please!");
          break;
        default:
          toast("Something went wrong");
      }
    }
  }, [googleError]);
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl mr-1.5 mt-4 px-3">
        <div className="card-body">
          <img src={login} style={{ height: "100%" }} alt="" />
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl px-3">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                onChange={handleEmail}
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
                onChange={handlePassword}
              />
            </div>
            <input
              className="btn w-full max-w-xs mt-4"
              type="submit"
              value="LOGIN"
            />
          </form>

          <p>
            <small>
              New To Doctors Portal{" "}
              <Link className="text-primary" to="/signup">
                Create New Account
              </Link>
            </small>
          </p>

          <div className="divider">OR</div>
          <button
            className="btn btn-outline"
            onClick={() => signInWithGoogle()}
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
