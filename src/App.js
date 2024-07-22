// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AsNavFor from './components/AsNavFor';
import VideoPlayerPage from './components/VideoPlayerPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/asnavfor"
          element={
            <PrivateRoute>
              <AsNavFor />
            </PrivateRoute>
          }
        />
        <Route path="/video" element={<VideoPlayerPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
