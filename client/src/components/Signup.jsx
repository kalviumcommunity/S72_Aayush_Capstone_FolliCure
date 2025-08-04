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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
        if (data.alert) {
          setAlertMessage(data.alert);
          setShowAlert(true);
          throw new Error(data.alert);
        }
        throw new Error(data.message || 'Registration failed');
      }

      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // Show success alert
      setAlertMessage(data.alert || 'Registration successful! Welcome to FolliCure!');
      setShowAlert(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In logic here
    console.log('Google Sign In clicked');
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Alert Popup */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-[#FF5B5B] animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#FF5B5B]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{alertMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5B5B]"
                    onClick={() => setShowAlert(false)}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
