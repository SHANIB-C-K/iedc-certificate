
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import HomeFiles from "./HomeFiles";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to the IEDC</h1>
        <p>Please find your certificate and download them</p>
      </div>
      <div className="info-section">
        <h2>Certificates</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <HomeFiles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
