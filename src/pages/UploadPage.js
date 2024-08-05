import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      setFile(null); // Reset file input after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  const onFileRemove = () => {
    setFile(null);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Upload File</h5>
        </div>
        <div className="card-body">
          <input type="file" onChange={onFileChange} />
          {file && (
            <div className="mt-2">
              <p>Selected file: {file.name}</p>
              <button className="btn btn-danger" onClick={onFileRemove}>
                Remove File
              </button>
            </div>
          )}
          <button
            className="btn btn-primary mt-2"
            onClick={onFileUpload}
            disabled={!file}
          >
            Upload
          </button>
        </div>
        <Link to="/navadmin" className="btn btn-secondary">
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default UploadPage;
