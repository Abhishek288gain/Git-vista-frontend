import React, { useState, useEffect } from "react";
import axios from "axios";// for connection with backend in secure way
import { useAuth } from "../../AuthContext";

//for creating component of signup

import { Heading, Button } from "@primer/react";

import "./auth.css";//for add styling in auth page

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);//when client connect with server initialy loading = false (there is no connect)

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); //when user click btn after filling signUp details. page will loading
      const res = await axios.post("http://localhost:3002/signup", {
        email: email,
        password: password,
        username: username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId); //userId comes from response

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";//after signUp user will redirect to dashboard
    } catch (err) {
      console.log(err);
      alert("Signup Failed!");
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
          <div style={{ paddingBottom: "12px", borderBottom: "1px solid #30363d" }}>
            <Heading as="h2">Sign Up</Heading>
          </div>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}//set Username on Change 
            />
          </div>

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
            onClick={handleSignup}
          >
            {/* //if loading occer then we will see Loading... on btn Block for somw time else we will see SIgnUp  */}
            {loading ? "Loading..." : "Signup"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;



