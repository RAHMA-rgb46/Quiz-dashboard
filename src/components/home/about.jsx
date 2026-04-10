
import React, { Component } from "react";
import { User, BellDot, Search } from "lucide-react";
import withRouter from "../../utils/withRouter";
 import TopBar from "./topbar";
import "./about.css";

export class About extends Component {
  state = {
    history: [],
  };

  loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    this.setState({ history });
  };

  componentDidMount() {
    this.loadHistory();

    window.addEventListener("storage", this.loadHistory);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.loadHistory);
  }

  openAttempt = (id) => {
    this.props.navigate(`/history/${id}`);
  };

  // Helpers
  formatCourse = (courseId) => (courseId ? courseId.toUpperCase() : "N/A");

  formatScore = (item) => `${item.correct}/${item.total}`;

  renderStatus = (status) => {
    const isPass = status === "Passed";
    return (
      <span className={isPass ? "passed" : "failed"}>
        {isPass ? "✅ Passed" : "❌ Failed"}
      </span>
    );
  };

  render() {
    const { history } = this.state;

    const recent = history.slice(0, 3);

    return (
      <>
        <div className="home-section">
          {/* <div className="d-flex col-12 sum">
            <div className="col-2">
              <h5 className="welcome">History</h5>
            </div>

            <div className="text d-flex align-items-center justify-content-end col-10">
              <input type="text" placeholder="search" className="search" />
              <BellDot className="me-2 p-1" />
              <User className="me-1 p-1" />
              <p className="mt-2 me-4">Rahma</p>
            </div>
          </div> */}
          <TopBar title="History" />

          <div className="line"></div>


          <div className="card-section d-flex me-3 mt-5">
            {/* Recent Activity */}
            <div className="recent">
              <h3>Recent Activity</h3>

              <div className="recent-table">
                {recent.length === 0 ? (
                  <div className="recent-row">
                    <span>No attempts yet</span>
                    <span>-</span>
                    <span>-</span>
                  </div>
                ) : (
                  recent.map((item) => (
                    <div
                      className="recent-row"
                      key={item.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.openAttempt(item.id)}
                      title="Click to view details"
                    >
                      <span>
                        {item.dateLabel
                          ? item.dateLabel.split(",")[0]
                          : "Date"}
                      </span>
                      <span>{this.formatScore(item)}</span>
                      {this.renderStatus(item.status)}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simple progress cards (optional summary) */}
            <div className="progress-card">
              <div className="progress-header">
                <h4>Pass Rate</h4>
                <span>
                  {history.length === 0
                    ? "0%"
                    : `${Math.round(
                        (history.filter((h) => h.status === "Passed").length /
                          history.length) *
                          100
                      )}%`}
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width:
                      history.length === 0
                        ? "0%"
                        : `${Math.round(
                            (history.filter((h) => h.status === "Passed")
                              .length /
                              history.length) *
                              100
                          )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="progress-card">
              <div className="progress-header">
                <h4>Total Attempts</h4>
                <span>{history.length}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: history.length ? "100%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <span className="">Date</span>
              <span className="ms-5 ps-5">Score</span>
              <span className="">Course</span>
              <span className="">Status</span>
            </div>

            {history.length === 0 ? (
              <div className="table-row">
                <span>No history yet</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </div>
            ) : (
              history.map((item) => (
                <div
                  className="table-row"
                  key={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.openAttempt(item.id)}
                  title="Click to view details"
                >
                  <span>{item.dateLabel}</span>
                  <span>{this.formatScore(item)}</span>
                  <span>{this.formatCourse(item.courseId)}</span>
                  <span>{this.renderStatus(item.status)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(About);