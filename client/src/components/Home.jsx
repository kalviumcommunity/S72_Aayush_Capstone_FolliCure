import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuClick = () => {
    console.log('Menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen w-full relative bg-gray-50">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/Home.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/50"></div>
      </div>

      {/* 3-Dots Menu */}
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={handleMenuClick}
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in">
            <button
              onClick={() => {
                navigate('/home');
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Main Page
            </button>
            <button
              onClick={() => {
                navigate('/profile');
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome User!</h1>
          <p className="text-xl text-gray-700 mb-8">Lets start your haircare journey</p>
          <button 
            className="w-fit px-8 py-3 bg-[#FFB5B5] text-gray-800 rounded-lg hover:bg-[#FF9B9B] transition-all duration-200 font-medium"
            onClick={() => navigate('/quiz')}
          >
            Start Quiz
          </button>
        </div>

        {/* Right Section - Animated Card */}
        <div className="w-1/2 p-16 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full transform transition-all duration-1000 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-6 text-gray-900 animate-fade-in">Follicure</h2>
            <p className="text-lg text-gray-500 leading-relaxed animate-fade-in-delay">
              is a personalized haircare website which help solving your problems related to your hair
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
