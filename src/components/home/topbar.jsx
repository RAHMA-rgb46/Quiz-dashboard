import React, { Component } from "react";
import { User, BellDot } from "lucide-react";

export class TopBar extends Component {
  render() {
    const { title } = this.props;
    // Add these lines right at the top of render()
    const userString = localStorage.getItem("authUser");
    const user = userString ? JSON.parse(userString) : {};
    const displayName = user.username || "Student";


    return (
      <div className="d-flex col-12 sum">
        <div className="col-2">
          <h5 className="welcome">{title}</h5>
        </div>

        <div className="text d-flex align-items-center justify-content-end col-10">
          <input type="text" placeholder="search" className="search" />
          <BellDot className="me-2 p-1" />
          <User className="me-1 p-1" />
          <p className="mt-2 me-4">{displayName}</p>
        </div>
      </div>
    );
  }
}

export default TopBar;