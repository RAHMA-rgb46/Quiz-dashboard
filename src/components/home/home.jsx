

import React, { Component } from 'react'
import { User, BellDot, Star, ClipboardCheck, Scale, Layers } from "lucide-react";
import DashboardChart from "../charts/DashboardChart";
import TopBar from "./topbar";
import "./home.css";

export class Home extends Component {
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

  // ---- computed metrics ----
  getHighest = () => {
    const { history } = this.state;
    if (history.length === 0) return { correct: 0, total: 0, percent: 0 };
    const best = history.reduce((a, b) => (b.percent > a.percent ? b : a), history[0]);
    return { correct: best.correct, total: best.total, percent: best.percent };
  };

  getAveragePercent = () => {
    const { history } = this.state;
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, h) => acc + (h.percent || 0), 0);
    return Math.round(sum / history.length);
  };

  getQuestionsSolved = () => {
    const { history } = this.state;
    return history.reduce((acc, h) => acc + (h.total || 0), 0);
  };

  getProgressMade = () => {
    // choose what "progress" means. Here: pass rate %
    const { history } = this.state;
    if (history.length === 0) return 0;
    const passed = history.filter((h) => h.status === "Passed").length;
    return Math.round((passed / history.length) * 100);
  };

  // ---- chart data ----
  getHoursData = () => {
    // sums time spent per weekday
    const { history } = this.state;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const map = Object.fromEntries(days.map((d) => [d, 0]));

    history.forEach((h) => {
      const spentSeconds = Math.max(
        0,
        (h.durationSeconds || 0) - (h.timeLeftSeconds || 0)
      );
      const spentHours = +(spentSeconds / 3600).toFixed(2);

      const date = h.dateISO ? new Date(h.dateISO) : new Date();
      const day = days[date.getDay()];
      map[day] += spentHours;
    });

    return days.map((d) => ({ day: d, hours: +map[d].toFixed(2) }));
  };

  getPerformanceData = () => {
    // last 6 attempts
    const { history } = this.state;
    const last = history.slice(0, 6).reverse();

    return last.map((h, idx) => ({
      label: `${(h.courseId || "quiz").toUpperCase()} ${idx + 1}`,
      percent: h.percent || 0,
    }));
  };

  render() {
    const best = this.getHighest();
    const avg = this.getAveragePercent();
    const solved = this.getQuestionsSolved();
    const progress = this.getProgressMade();

    const hoursData = this.getHoursData();
    const performanceData = this.getPerformanceData();

    return (
      <>
        <div className="home-section">
          {/* Header */}
          {/* <div className="d-flex col-12 sum">
            <div className="col-2">
              <h5 className="welcome">Dashboard</h5>
            </div>

            <div className="text d-flex align-items-center justify-content-end col-10">
              <input type="text" placeholder="search" className="search" />
              <BellDot className="me-2 p-1" />
              <User className="me-1 p-1" />
              <p className="mt-2 me-4">Rahma</p>
            </div>
          </div> */}
         <TopBar title="Dashboard"/>

          {/* Cards */}
          <div className="card-section d-flex mt-2">
            <div className="card1">
              <div className="d-flex">
                <p className="score ms-1">Highest Score</p>
                <div>
                  <Star className="star mt-2" />
                </div>
              </div>
              <div>
                <h5 className="num">
                  {best.correct}/{best.total} ({best.percent}%)
                </h5>
              </div>
              <p className="score">Based on history</p>
            </div>

            <div className="card1">
              <div className="d-flex">
                <p className="score ms-1">Average score</p>
                <div>
                  <Scale className="star1 mt-2" />
                </div>
              </div>
              <div>
                <h5 className="num">{avg}%</h5>
              </div>
              <p className="score">Based on history</p>
            </div>

            <div className="card1">
              <div className="d-flex">
                <p className="score ms-1">Questions Solved</p>
                <div>
                  <ClipboardCheck className="star2 mt-2" />
                </div>
              </div>
              <div>
                <h5 className="num">{solved}</h5>
              </div>
              <p className="score">Total questions attempted</p>
            </div>

            <div className="card1">
              <div className="d-flex">
                <p className="score ms-1">Progress made</p>
                <div>
                  <Layers className="star3 mt-2" />
                </div>
              </div>
              <div>
                <h5 className="num">{progress}%</h5>
              </div>
              <p className="score">Pass rate (60% mark)</p>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-2 ms-2 me-2">
            <DashboardChart hoursData={hoursData} performanceData={performanceData} />
          </div>
        </div>
      </>
    );
  }
}

export default Home;