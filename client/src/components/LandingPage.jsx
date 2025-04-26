import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image - No overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Main Content with Blur Effect */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title Container with Blur and Shadow */}
        <div className="text-center space-y-8 py-16 px-12 rounded-2xl backdrop-blur-sm bg-white/30 shadow-2xl min-h-[400px] flex flex-col justify-center items-center">
          <h1 className="text-[4rem] md:text-[5rem] font-bold tracking-[.25em] text-gray-800">
            FolliCure
          </h1>
          
          <p className="text-xl text-gray-700 font-medium">
            Welcome!
          </p>

          {/* Get Started Button */}
          <Link 
            to="/get-started" 
            className="inline-flex items-center px-10 py-4 mt-8 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-[#FF5B5B] hover:bg-[#FF4242] shadow-lg shadow-[#FF5B5B]/30"
          >
            <span>Get Started</span>
            <svg 
              className="w-6 h-6 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 