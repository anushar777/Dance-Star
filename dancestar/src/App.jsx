import React, { useState } from 'react';
import "./App.css"



function App() {
  const [choreographyFile, setChoreographyFile] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [choreographyError, setChoreographyError] = useState('');
  const [userError, setUserError] = useState('');

  const acceptedVideoTypes = [
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/flv',
    'video/webm',
    'video/mkv'
  ];

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Check if file is a video
    if (!acceptedVideoTypes.includes(file.type)) {
      const errorMessage = 'File type not supported. Please upload a video file (MP4, AVI, MOV, WMV, FLV, WebM, MKV).';
      
      if (type === 'choreography') {
        setChoreographyError(errorMessage);
        setChoreographyFile(null);
      } else {
        setUserError(errorMessage);
        setUserFile(null);
      }
      return;
    }

    // Clear any previous errors
    if (type === 'choreography') {
      setChoreographyError('');
      setChoreographyFile(file);
    } else {
      setUserError('');
      setUserFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    if (!file) return;

    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        files: [file]
      }
    };
    
    handleFileUpload(syntheticEvent, type);
  };

  const removeFile = (type) => {
    if (type === 'choreography') {
      setChoreographyFile(null);
      setChoreographyError('');
    } else {
      setUserFile(null);
      setUserError('');
    }
  };

  return (
    <>
      <div className="app">
        <h1>Dance Star</h1>
      </div>
      
      <div className="videorow">
        <div className="choreography">
          <h2>Choreography</h2>
        </div>
        <div className="uservideo">
          <h2>User Video</h2>
        </div>
      </div>
      
      <div className="fileupload">
        {/* Choreography Upload */}
        <div className="upload-container">
          <div
            className={`upload-area ${choreographyFile ? 'has-file' : ''} ${choreographyError ? 'has-error' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'choreography')}
          >
            <input
              type="file"
              id="choreography-upload"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'choreography')}
              className="file-input"
            />
            <label htmlFor="choreography-upload" className="upload-label">
              {choreographyFile ? (
                <div className="file-info">
                  <div className="file-icon">🎬</div>
                  <div className="file-details">
                    <div className="file-name">{choreographyFile.name}</div>
                    <div className="file-size">{(choreographyFile.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFile('choreography')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">
                    <div className="upload-title">Upload Choreography Video</div>
                    <div className="upload-subtitle">Drag and drop or click to browse</div>
                    <div className="upload-formats">Supports: MP4, AVI, MOV, WMV, FLV, WebM, MKV</div>
                  </div>
                </div>
              )}
            </label>
          </div>
          {choreographyError && (
            <div className="error-message">{choreographyError}</div>
          )}
        </div>

        {/* User Video Upload */}
        <div className="upload-container">
          <div
            className={`upload-area ${userFile ? 'has-file' : ''} ${userError ? 'has-error' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'user')}
          >
            <input
              type="file"
              id="user-upload"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'user')}
              className="file-input"
            />
            <label htmlFor="user-upload" className="upload-label">
              {userFile ? (
                <div className="file-info">
                  <div className="file-icon">🎬</div>
                  <div className="file-details">
                    <div className="file-name">{userFile.name}</div>
                    <div className="file-size">{(userFile.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFile('user')}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">
                    <div className="upload-title">Upload Your Dancing Video</div>
                    <div className="upload-subtitle">Drag and drop or click to browse</div>
                    <div className="upload-formats">Supports: MP4, AVI, MOV, WMV, FLV, WebM, MKV</div>
                  </div>
                </div>
              )}
            </label>
          </div>
          {userError && (
            <div className="error-message">{userError}</div>
          )}
        </div>
      </div>

      {/* Analysis Button */}
      <div className="analysis-section">
        <button 
          className="analysis"
          disabled={!choreographyFile || !userFile}
          onClick={async () => {
            // Upload files first (if not already uploaded)
            const formData = new FormData();
            formData.append('choreography', choreographyFile);
            formData.append('user', userFile);

            await fetch('http://localhost:5000/upload', {
              method: 'POST',
              body: formData,
            });

            // Trigger analysis
            const response = await fetch('http://localhost:5000/analyze', {
              method: 'POST',
            });
            const result = await response.json();
            alert('Analysis result: ' + result.message);
          }}
        >
          Begin Analysis
        </button>
      </div>
    </>
  );
}

export default App;