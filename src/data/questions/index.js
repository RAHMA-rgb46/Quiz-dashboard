import html from "./html";
import css from "./css";
import js from "./js";

export const questionsByCourse = {
  html,
  css,
  js,
};

// optional helper: gives you a list of available courses
export const availableCourses = Object.keys(questionsByCourse);