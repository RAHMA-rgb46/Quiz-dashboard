

        
import React, { Component } from "react";
import withRouter from "../../utils/withRouter";
import TopBar from "./topbar";
import "./log.css";

export class Log extends Component {
  componentDidMount() {
    localStorage.removeItem("authUser");
    this.props.navigate("/login", { replace: true });
    // Keep history (optional)
    const history = localStorage.getItem("history");

    // Clear session/auth data
     localStorage.removeItem("authUser");
// navigate to login after
     this.props.navigate("/login", { replace: true });

    // Restore history if you want it not to be deleted on logout
    if (history) localStorage.setItem("history", history);

    // Redirect after a short delay
    this.redirectTimer = setTimeout(() => {
      this.props.navigate("/", { replace: true });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimer);
  }

  render() {
    return (
      <>
        <TopBar title="LogOut" />

        <div className="home-section">
          <div className="logout-card">
            <h3 className="logout-title">You’ve logged out.</h3>
            <p className="logout-text">Redirecting...</p>

            <button
              className="logout-btn"
              onClick={() => this.props.navigate("/", { replace: true })}
            >
              Go now
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Log);
  

