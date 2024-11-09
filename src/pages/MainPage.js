import React from "react";
import "./MainPage.css";

const MainPage = ({ username, firstName, lastName }) => (
  <div className="main-page">
    <div className="left-section">
      <h2>Welcome, {username}!</h2> {/* Display the username */}
      <div className="progress">Progress</div>
      <div className="stats">Stats</div>
    </div>
    <div className="right-section">
      <div className="profile">Profile</div>
      <div className="highlights">Highlights</div>
      <div className="courses-summary">Courses Summary</div>
    </div>
  </div>
);

export default MainPage;
