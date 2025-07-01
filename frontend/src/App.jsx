import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SubmitFeedback from './pages/SubmitFeedback';
import FeedbackDetail from './pages/FeedbackDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/feedback/:id" element={<FeedbackDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

