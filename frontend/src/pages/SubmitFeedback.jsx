import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const SubmitFeedback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Feature',
  });

  const [error, setError] = useState('');

  // ✅ Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/submit');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category) {
      setError('All fields are required');
      return;
    }

    try {
      await API.post('/feedbacks', form);
      alert('Feedback submitted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Submit failed:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            className="w-full border p-2 rounded"
            value={form.category}
            onChange={handleChange}
          >
            <option>Feature</option>
            <option>Bug</option>
            <option>UI</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitFeedback;

