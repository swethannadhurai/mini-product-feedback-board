import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import FeedbackCard from '../components/FeedbackCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await API.get('/feedbacks');
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleUpvote = (updatedFeedback) => {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb._id === updatedFeedback._id ? updatedFeedback : fb))
    );
  };

  const filtered = feedbacks
    .filter((fb) =>
      (filterCategory === 'All' || fb.category === filterCategory) &&
      (filterStatus === 'All' || fb.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortBy === 'Most Upvoted') return b.upvotes - a.upvotes;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleAddFeedback = () => {
    if (!user) {
      alert('Please login to submit feedback');
      navigate('/login?redirect=/submit');
    } else {
      navigate('/submit');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Feedback Board</h1>
        <button
          onClick={handleAddFeedback}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Feedback
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          <option>Feature</option>
          <option>Bug</option>
          <option>UI</option>
          <option>Other</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Open</option>
          <option>Planned</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Newest</option>
          <option>Most Upvoted</option>
        </select>
      </div>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : filtered.length === 0 ? (
        <p>No matching feedbacks found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((fb) => (
            <FeedbackCard key={fb._id} feedback={fb} onUpvote={handleUpvote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;



