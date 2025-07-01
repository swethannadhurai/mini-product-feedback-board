import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

const FeedbackDetail = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [commentForm, setCommentForm] = useState({ name: '', message: '' });
  const [error, setError] = useState('');

  const fetchFeedback = async () => {
    try {
      const res = await API.get(`/feedbacks/${id}`);
      setFeedback(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Could not load feedback');
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.message) return;

    try {
      const res = await API.post(`/feedbacks/${id}/comments`, commentForm);
      setFeedback(res.data); 
      setCommentForm({ name: '', message: '' });
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await API.patch(`/feedbacks/${id}/status`, { status: newStatus });
      setFeedback(res.data);
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!feedback) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>

      <div className="mt-4 border p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold">{feedback.title}</h2>
        <p className="mt-2 text-gray-700">{feedback.description}</p>

        <div className="mt-4 flex gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{feedback.category}</span>
          <span className="bg-gray-200 px-2 py-1 rounded text-sm">{feedback.status}</span>
        </div>

        <p className="mt-4 font-semibold">👍 {feedback.upvotes} Upvotes</p>

        
        {localStorage.getItem('isAdmin') === 'true' && (
          <div className="mt-4">
            <label className="block font-semibold mb-1">Change Status:</label>
            <select
              value={feedback.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border px-3 py-1 rounded"
            >
              <option value="Open">Open</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        )}
      </div>

      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        {feedback.comments.length === 0 && <p>No comments yet.</p>}
        {feedback.comments.map((c, i) => (
          <div key={i} className="border-b py-2">
            <p className="font-medium">{c.name}</p>
            <p className="text-gray-600 text-sm">{c.message}</p>
          </div>
        ))}

        
        <form onSubmit={handleCommentSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full border p-2 rounded"
            value={commentForm.name}
            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
            required
          />
          <textarea
            name="message"
            placeholder="Your comment"
            rows={3}
            className="w-full border p-2 rounded"
            value={commentForm.message}
            onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackDetail;


