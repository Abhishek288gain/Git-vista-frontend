import React, { useState, useEffect } from "react";
import axios from "axios"; // for connection with backend in secure way
import { useAuth } from "../../AuthContext";

//for creating component of signup

import { Heading, Button } from "@primer/react";

import "./auth.css"; //for add styling in auth page

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  // useEffect(() => {
  //   //initially no any will login
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setCurrentUser(null);
  // });

  const [email, setEmail] = useState(""); //taking email enter by user
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); //when user click btn after filling login details. page will loading
      const res = await axios.post("http://localhost:3002/login", {
        //sending user login detail to /login route
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token); //set token in localStorage for user after login
      localStorage.setItem("userId", res.data.userId); //beacuese we do not want user login again after login

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/"; //after login user will redirect to dashboard
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <div
            style={{ paddingBottom: "12px", borderBottom: "1px solid #30363d" }}
          >
            <Heading as="h2">Login</Heading>
          </div>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading} // if loading occer thene btn will  disabled for somw time
            onClick={handleLogin}
          >
            {/* //if loading occer then we will see Loading... on btn Block for somw time else we will see SIgnUp  */}
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
