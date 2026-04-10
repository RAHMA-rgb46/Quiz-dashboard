

import React, { Component } from "react";
import {
  User,
  BellDot,
  Search,
  Book,
  Palette,
  Speaker,
  Paperclip,
  Music,
  Calculator,
} from "lucide-react";
import withRouter from "../../utils/withRouter";
import TopBar from "./topbar";
import "./courses.css";

export class Courses extends Component {
  startQuiz = (courseId) => {
    this.props.navigate(`/exams/${courseId}`);
  };

  comingSoon = () => {
    alert("This quiz is coming soon. Please choose HTML, CSS, or JavaScript for now.");
  };

  render() {
    return (
      <div className="home-section">
        {/* top bar */}
        {/* <div className="d-flex col-12 sum">
          <div className="col-1">
            <h5 className="welcome">Courses</h5>
          </div>

          <div className="text d-flex align-items-center justify-content-end col-11">
            <input type="text" placeholder="search" className="search" />
            <BellDot className="me-2 p-1" />
            <User className="me-1 p-1" />
            <p className="mt-2 me-4">Rahma</p>
          </div>
        </div> */}
        <TopBar title="Courses" />

        <div className="line"></div>

        {/* page content */}
        <div className="courses">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="m-0">Courses</h2>
          </div>

          <div className="course-grid">
            <div className="course-card">
              <h3 className="topic">
                <Book className="icons" /> HTML
              </h3>
              <p>20 Questions</p>
              <div className="mini-bar">
                <div className="mini-fill"></div>
              </div>
              <button className="button" onClick={() => this.startQuiz("html")}>
                Start Quiz
              </button>
            </div>

            <div className="course-card">
              <h3 className="topic">
                <Palette className="icons" /> CSS
              </h3>
              <p>15 Questions</p>
              <div className="mini-bar">
                <div className="mini-fill"></div>
              </div>
              <button className="button" onClick={() => this.startQuiz("css")}>
                Start Quiz
              </button>
            </div>

            <div className="course-card">
              <h3 className="topic">
                <Paperclip className="icons" /> JAVA SCRIPT
              </h3>
              <p>15 Questions</p>
              <div className="mini-bar">
                <div className="mini-fill"></div>
              </div>
              <button className="button" onClick={() => this.startQuiz("js")}>
                Start Quiz
              </button>
            </div>

            <div className="course-card">
              <h3 className="topic">
                <Speaker className="icons" /> FRENCH
              </h3>
              <p>15 Questions</p>
              <div className="mini-bar">
                <div className="mini-fill"></div>
              </div>
              <button className="button" onClick={this.comingSoon}>
                Start Quiz
              </button>
            </div>

            <div className="course-card">
              <h3 className="topic">
                <Music className="icons" /> ENGLISH
              </h3>
              <p>15 Questions</p>
              <div className="mini-bar">
                <div className="mini-fill"></div>
              </div>
              <button className="button" onClick={this.comingSoon}>
                Start Quiz
              </button>
            </div>

            <div className="course-card">
              <h3 className="topic">
                <Calculator className="icons" /> CALCULUS
              </h3>
              <p>15 Questions</p>
              <div className="mini-bar">
                <div className="mini-fill"></div>
              </div>
              <button className="button" onClick={this.comingSoon}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Courses);