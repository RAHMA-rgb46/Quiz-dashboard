import React, { Component } from "react";
import withRouter from "../../utils/withRouter";

import "./login.css";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = (e) => {
  e.preventDefault();

  const { username, password } = this.state;

  if (!username || !password) {
    this.setState({ error: "Enter username and password" });
    return;
  }

  localStorage.setItem("authUser", JSON.stringify({ username }));

  // Go back to the page the user was trying to visit, or home
  const redirectTo = this.props.location.state?.from?.pathname || "/";
  this.props.navigate(redirectTo, { replace: true });
};

  render() {
    const { username, password, error } = this.state;

    return (
     
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">Welcome back to TestFlow</p>

          {error ? <div className="login-error">{error}</div> : null}

          <form onSubmit={this.handleSubmit}>
            <label className="login-label">Username</label>
            <input
              className="login-input"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="Username"
            />

            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
            />

            <button className="login-btn" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>  
    );
  }
}

export default withRouter(Login);