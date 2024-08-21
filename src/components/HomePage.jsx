import React from "react";
import { Link } from "react-router-dom";
import HomeFiles from "./HomeFiles";
import "./HomePage.css"; // Import the custom CSS file

const HomePage = () => {
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">Welcome to the IEDC</h1>
        <p className="hero-subtitle">Please find your certificate and download them</p>
      </div>
      <div className="info-section">
        <h2 className="info-title">Certificates</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <HomeFiles />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
