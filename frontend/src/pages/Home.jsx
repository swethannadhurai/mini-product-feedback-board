import React, { useEffect, useState } from 'react';
import API from '../services/api';
import FeedbackCard from '../components/FeedbackCard';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await API.get('/feedbacks');
        setFeedbacks(res.data);
        console.log("Fetched Feedbacks:", res.data);
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
      (filterCategory.toLowerCase() === 'all' || fb.category.toLowerCase() === filterCategory.toLowerCase()) &&
      (filterStatus.toLowerCase() === 'all' || fb.status.toLowerCase() === filterStatus.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Most Upvoted') return b.upvotes - a.upvotes;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  console.log("Filtered Feedbacks:", filtered);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Product Feedback Board</h1>

    
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
