

import React, { Component } from "react";
import { User, BellDot, AlarmClockCheck, Hourglass } from "lucide-react";
import withRouter from "../../utils/withRouter";
import { questionsByCourse } from "../../data/questions";
import TopBar from "./topbar";
import "./exams.css";

export class Exams extends Component {
  questionsByCourse = {
    html: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Machine Learning",
          "Home Tool Mark Language",
          "Hyper Tool Multi Language",
        ],
        correctIndex: 0,
      },
      {
        question: "Which tag is used to create a link in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctIndex: 1,
      },
    ],
    css: [
      {
        question: "Which CSS property changes the text color?",
        options: ["font-style", "background-color", "color", "text-decoration"],
        correctIndex: 2,
      },
    ],
    js: [
      {
        question: "Which keyword declares a variable (old style) in JS?",
        options: ["var", "int", "string", "define"],
        correctIndex: 0,
      },
    ],
  };

  durationSeconds = 10 * 60;
  passMarkPercent = 60;

  state = {
    currentIndex: 0,
    selected: {},
    timeLeft: this.durationSeconds,
  };

  
  getCourseId = () => this.props.params?.courseId; // undefined if user is on /exams

  getQuestions = () => {
  const courseId = this.getCourseId();
  if (!courseId) return [];
  return questionsByCourse[courseId] || [];
};

  startTimer = () => {
   
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(this.timerId);
          this.timerId = null;
          setTimeout(this.finishExam, 0);
          return { timeLeft: 0 };
        }
        return { timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  resetQuizState = () => {
  
    this.setState({
      currentIndex: 0,
      selected: {},
      timeLeft: this.durationSeconds,
    });
  };

  handleBeforeUnload = (e) => {
  
  if (localStorage.getItem("activeQuiz") === "true") {
    e.preventDefault();
    e.returnValue = ""; 
  }
};

  componentDidMount() {
    if (this.getCourseId()) {
      this.resetQuizState();
      this.startTimer();
      localStorage.setItem("activeQuiz", "true");
      window.addEventListener("beforeunload", this.handleBeforeUnload);
    }
  }

  componentDidUpdate(prevProps) {
    const prevCourse = prevProps.params?.courseId;
    const currentCourse = this.props.params?.courseId;

    if (prevCourse !== currentCourse) {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }

      if (currentCourse) {
        localStorage.setItem("activeQuiz", "true");
        this.resetQuizState();
        this.startTimer();
      }
    }
  }

  componentWillUnmount() {
    if (this.timerId) clearInterval(this.timerId);
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  handleSelect = (optionIndex) => {
    this.setState((prev) => ({
      selected: { ...prev.selected, [prev.currentIndex]: optionIndex },
    }));
  };

  goPrev = () => {
    this.setState((prev) => ({
      currentIndex: Math.max(0, prev.currentIndex - 1),
    }));
  };

  goNext = () => {
    const questions = this.getQuestions();
    this.setState((prev) => ({
      currentIndex: Math.min(questions.length - 1, prev.currentIndex + 1),
    }));
  };

  calculate = () => {
    const questions = this.getQuestions();
    let correct = 0;

    questions.forEach((q, i) => {
      if (this.state.selected[i] === q.correctIndex) correct += 1;
    });

    const total = questions.length;
    const wrong = total - correct;
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    const status = percent >= this.passMarkPercent ? "Passed" : "Failed";

    return { correct, wrong, total, percent, status };
  };

  finishExam = () => {
  
    const courseId = this.getCourseId();
    if (!courseId) return;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
      localStorage.removeItem("activeQuiz");
    }

    const { correct, wrong, total, percent, status } = this.calculate();

    const attemptId =
      (crypto?.randomUUID && crypto.randomUUID()) ||
      `att_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    const attempt = {
      id: attemptId,
      courseId,
      dateISO: new Date().toISOString(),
      dateLabel: new Date().toLocaleString(),
      total,
      correct,
      wrong,
      percent,
      status,
      passMarkPercent: this.passMarkPercent,
      durationSeconds: this.durationSeconds,
      timeLeftSeconds: this.state.timeLeft,
      selectedAnswers: this.state.selected,
    };

    const prev = JSON.parse(localStorage.getItem("history") || "[]");
    localStorage.setItem("history", JSON.stringify([attempt, ...prev]));

    this.props.navigate(`/results/${attemptId}`);
  };

  renderTopBar = () => (
    // <div className="d-flex col-12 sum">
    //   <div className="col-2">
    //     <h5 className="welcome">Take Exams</h5>
    //   </div>

    //   <div className="text d-flex align-items-center justify-content-end col-10">
    //     <input type="text" placeholder="search" className="search" />
    //     <BellDot className="me-2 p-1" />
    //     <User className="me-1 p-1" />
    //     <p className="mt-2 me-4">Rahma</p>
    //   </div>
    // </div>
    <TopBar title="Take Exams" />
  );

  render() {
    const { currentIndex, selected, timeLeft } = this.state;

    const courseId = this.getCourseId();

    // ✅ /exams (no quiz started)
    if (!courseId) {
      return (
        <>
          {this.renderTopBar()}

          
            <div className="card1 ms-2 me-2 mt-5" style={{ width: "80%" }}>
              <h3>No quiz started</h3>
              <p className="mt-2">
                You haven’t started a quiz yet. Go to <b>Courses</b> and click{" "}
                <b>Start Quiz</b>.
              </p>

              <button
                className="button"
                onClick={() => this.props.navigate("/courses")}
              >
                Go to Courses
              </button>
            </div>
          
        </>
      );
    }

   
    const questions = this.getQuestions();
    const total = questions.length;
    const q = questions[currentIndex];

    if (!q) {
      return (
        <>
          {this.renderTopBar()}
          <div className="exam-page">No questions found for this course.</div>
        </>
      );
    }

    return (
      <>
        {this.renderTopBar()}

        <div className="exam-page">
          <div className="exam-header">
            <div className="question-count">
              Question {currentIndex + 1} / {total}
            </div>

            <div className="timer">
              <span>
                <AlarmClockCheck className="icons" />{" "}
                {this.formatTime(this.durationSeconds - timeLeft)}
              </span>
              <span>
                <Hourglass className="icons" /> {this.formatTime(timeLeft)} left
              </span>
            </div>
          </div>

          <div className="question-box">
            <h2>{q.question}</h2>

            <div
              className={`options ${
                selected[currentIndex] !== undefined ? "locked" : ""
              }`}
            >
              {q.options.map((opt, i) => {
                const isSelected = selected[currentIndex] === i;

                return (
                  <label
                    key={i}
                    className={`option ${isSelected ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q-${currentIndex}`}
                      checked={isSelected}
                      onChange={() => this.handleSelect(i)}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="nav-buttons">
            <button
              className="prev"
              onClick={this.goPrev}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>

            {currentIndex === total - 1 ? (
              <button className="next" onClick={this.finishExam}>
                Finish
              </button>
            ) : (
              <button className="next" onClick={this.goNext}>
                Next →
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Exams);