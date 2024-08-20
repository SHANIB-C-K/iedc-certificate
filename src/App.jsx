import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (newFile) => {
    setFiles([...files, newFile]);
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
      <div className="main-content">
        <div className="content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/admin"
                element={
                  <>
                    <FileUpload onFileUpload={handleFileUpload} />
                    <FileList files={files} />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
