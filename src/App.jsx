

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/home/navigation/Navbar";
import RequireAuth from "./utils/RequireAuth";

import Login from "./components/auth/Login";
import Home from "./components/home/home";
import Courses from "./components/home/courses";
import Exams from "./components/home/exams";
import About from "./components/home/about";
import Logout from "./components/home/log";
import Results from "./components/home/results";
import HistoryDetails from "./components/home/historyDetails";
import './App.css';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="main">
      
      {/* Show sidebar ONLY if we are NOT on the login page */}
      {!isLoginPage && (
        <aside className="sidebar-wrapper">
          <Navbar />
        </aside>
      )}

      {/* Main page content area */}
      <main className="page-content">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (RequireAuth forces login first) */}
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/courses" element={<RequireAuth><Courses /></RequireAuth>} />
          <Route path="/exams" element={<RequireAuth><Exams /></RequireAuth>} />
          <Route path="/exams/:courseId" element={<RequireAuth><Exams /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
          <Route path="/history/:attemptId" element={<RequireAuth><HistoryDetails /></RequireAuth>} />
          <Route path="/results/:attemptId" element={<RequireAuth><Results /></RequireAuth>} />
          
          <Route path="/logout" element={<Logout />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;