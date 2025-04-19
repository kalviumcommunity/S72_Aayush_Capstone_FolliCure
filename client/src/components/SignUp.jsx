import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Show success alert
      alert('Registration successful! Welcome to FolliCure!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In logic here
    console.log('Google Sign In clicked');
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section - Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">GET STARTED</h1>
            <p className="text-gray-600">Welcome! Lets start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5B5B]/50 focus:border-[#FF5B5B] outline-none transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5B5B]/50 focus:border-[#FF5B5B] outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5B5B]/50 focus:border-[#FF5B5B] outline-none transition-all"
                placeholder="••••••••••"
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#FF5B5B] focus:ring-[#FF5B5B]/50 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-[#FF5B5B] hover:text-[#FF4242] font-medium">
                Forgot password
              </Link>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#FF5B5B] text-white py-4 rounded-lg hover:bg-[#FF4242] transition-all duration-200 font-semibold shadow-lg shadow-[#FF5B5B]/30 hover:shadow-xl hover:shadow-[#FF5B5B]/40"
            >
              Sign up
            </button>

            {/* Google Sign Up Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center space-x-2 border-2 border-gray-300 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium hover:border-[#FF5B5B]/30 hover:shadow-lg"
            >
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              <span className="text-gray-700">Sign up with Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FF5B5B] hover:text-[#FF4242] font-medium">
                Login!
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/login.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
