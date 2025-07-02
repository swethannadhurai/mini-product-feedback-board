import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { register } from '../services/auth';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register(form);
    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
    navigate(`/login?redirect=${redirectPath}`);
  } catch (err) {
    setError('Registration failed. Please try again.');
  }
};


  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
                 <Link to={`/login${location.search}`} className="text-blue-600 underline">
                  Login here
              </Link>

      </p>
    </div>
  );
};

export default Register;

