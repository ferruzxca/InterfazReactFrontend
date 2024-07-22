import React from 'react';
import { useLocation } from 'react-router-dom';
import './VideoPlayerPage.css';

const VideoPlayerPage = () => {
  const location = useLocation();
  const { videoPath, videoTitle, videoDescription } = location.state || {};

  if (!videoPath) {
    return <div>No video selected</div>;
  }

  return (
    <div className="video-container">
      <video controls>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {videoTitle && <h1 className="video-title">{videoTitle}</h1>}
      {videoDescription && <p className="video-description">{videoDescription}</p>}
    </div>
  );
};

export default VideoPlayerPage;
