

import React, { Component } from "react";
import withRouter from "../../utils/withRouter";
import TopBar from "./topbar";

export class HistoryDetails extends Component {
  getAttempt = () => {
    const { attemptId } = this.props.params;
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    return history.find((a) => a.id === attemptId);
  };

  back = () => {
    this.props.navigate("/about");
  };

  render() {
    const attempt = this.getAttempt();

    if (!attempt) {
      return (
        <>
          <TopBar title="History Details" />
          <div className="home-section">
            <div className="card1" style={{ width: "100%" }}>
              Attempt not found.
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <TopBar title="History Details" />

        <div className="home-section">
          <div className="card1" style={{ width: "100%" }}>
            <h4 style={{ marginBottom: 12 }}>Quiz Attempt</h4>

            <p><b>Course:</b> {attempt.courseId.toUpperCase()}</p>
            <p><b>Date:</b> {attempt.dateLabel}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={attempt.status === "Passed" ? "passed" : "failed"}>
                {attempt.status}
              </span>
            </p>

            <hr />

            <p><b>Total Questions:</b> {attempt.total}</p>
            <p><b>Correct:</b> {attempt.correct}</p>
            <p><b>Wrong:</b> {attempt.wrong}</p>
            <p><b>Percent:</b> {attempt.percent}%</p>
            <p><b>Pass mark:</b> 60%</p>

            <button className="button" onClick={this.back} style={{ marginTop: 12 }}>
              Back to History
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(HistoryDetails);