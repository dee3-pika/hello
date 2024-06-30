import React, { useState, useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const fileField = event.target.files[0];

    formData.append("file", fileField);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Resume Analyzer Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>You can apply for the job as you want.</p>
            </div>
            <div className="card" onClick={triggerFileUpload}>
              <MdFindInPage />
              <p>Upload your resume</p>
              <p>You can apply your Resume here.</p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>If you are the suitable one, please apply.</p>
            </div>
          </div>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          {message && <div id="message">{message}</div>}
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
