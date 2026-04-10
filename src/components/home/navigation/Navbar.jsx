


import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/test.png";

import {
  Home,
  Archive,
  NotebookText,
  BookOpenCheck,
  LogOut,
} from "lucide-react";

import "./navbar.css";

export class Navbar extends Component {
  isQuizActive = () => localStorage.getItem("activeQuiz") === "true";

handleNavClick = (e) => {
  if (this.isQuizActive()) {
    e.preventDefault();
    alert("You cannot leave the quiz until you finish.");
  }
};
  render() {
    return (
      <aside className="dash">
        <div className="brand">
          <img src={logo} className="profile" alt="logo" />
          <h6 className="brand-title">TestFlow</h6>
        </div>

        <ul className="sections">
          <li>
            <NavLink
              to="/"
              end
              onClick={this.handleNavClick}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              onClick={this.handleNavClick}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <Archive size={18} />
              <span>History</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/courses"
              onClick={this.handleNavClick}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <NotebookText size={18} />
              <span>Courses</span>
            </NavLink>
          </li>

          <li>
         <NavLink
           to="/exams"
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
           <BookOpenCheck size={18} />
           <span>Take Exams</span>
         </NavLink>
          </li>

          <li>
            <NavLink
              to="/logout"
              onClick={this.handleNavClick}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <LogOut size={18} />
              <span>LogOut</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    );
  }
}

export default Navbar;