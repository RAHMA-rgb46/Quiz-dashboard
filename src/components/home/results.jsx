import React, { Component } from "react";
import withRouter from "../../utils/withRouter";
import TopBar from "./topbar";

export class Results extends Component {
  getAttempt = () => {
    const { attemptId } = this.props.params;
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    return history.find((a) => a.id === attemptId);
  };

  goHistory = () => {
    this.props.navigate("/about");
  };

  viewDetails = () => {
    const { attemptId } = this.props.params;
    this.props.navigate(`/history/${attemptId}`);
  };

  render() {
    const attempt = this.getAttempt();

    if (!attempt) {
      return (
        <>
          <TopBar title="Results" />
          <div className="home-section">
            <div className="card1">Result not found.</div>
          </div>
        </>
      );
    }

    return (
      <>
        <TopBar title="Results" />

        <div className="home-section">
          <div className="card1" style={{ width: "100%" }}>
            <h4 style={{ marginBottom: 12 }}>Quiz Result</h4>

            <p><b>Course:</b> {attempt.courseId.toUpperCase()}</p>
            <p><b>Date:</b> {attempt.dateLabel}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={attempt.status === "Passed" ? "passed" : "failed"}>
                {attempt.status}
              </span>
            </p>

            <hr />

            <p>
              <b>Score:</b> {attempt.correct}/{attempt.total} ({attempt.percent}%)
            </p>
            <p><b>Correct:</b> {attempt.correct}</p>
            <p><b>Wrong:</b> {attempt.wrong}</p>
            <p><b>Pass mark:</b> 60%</p>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button className="button" onClick={this.viewDetails}>
                View Details
              </button>
              <button className="button" onClick={this.goHistory}>
                Go to History
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Results);