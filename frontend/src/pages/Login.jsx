import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data.user);
      localStorage.setItem('isAdmin', res.data.user.role === 'admin');

      const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
      navigate(redirectPath);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?{' '}
       <Link
            to={`/register${location.search}`}
           className="text-blue-600 underline"
          >
         Register here
      </Link>

      </p>
    </div>
  );
};

export default Login;
