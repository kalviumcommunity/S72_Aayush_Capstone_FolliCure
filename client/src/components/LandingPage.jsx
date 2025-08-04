import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to login page when Get Started is clicked
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/LandingPage.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Hero content box with blur effect - positioned upwards */}
      <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-2xl p-12 shadow-2xl max-w-lg mx-auto border border-white/30 -mt-32">
        <div className="flex flex-col items-center space-y-6">
          <h1 
            className="text-6xl font-bold leading-tight"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.20em',
              fontWeight: '600',
              color: '#000000'
            }}
          >
            FlolliCure
          </h1>
          <p 
            className="text-2xl font-normal tracking-wide"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.02em',
              color: '#4A4A4A'
            }}
          >
            Welcome!
          </p>
          <button 
            className="group relative text-white px-6 py-5 rounded-full font-medium text-xl flex items-center justify-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-[60px] overflow-hidden"
            onClick={handleGetStarted}
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.01em',
              backgroundColor: '#EA454C',
              background: 'linear-gradient(135deg, #EA454C, #d13a41)',
              minWidth: '60px',
              width: '60px'
            }}
            onMouseEnter={(e) => {
              e.target.style.width = '200px';
              e.target.style.minWidth = '200px';
            }}
            onMouseLeave={(e) => {
              e.target.style.width = '60px';
              e.target.style.minWidth = '60px';
            }}
          >
            {/* Text that appears on hover */}
            <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap" style={{ color: '#FFFFFF' }}>
              Get Started
            </span>
            
            {/* Arrow that appears at the end of text on hover, or centered when no text */}
            <span className="text-2xl font-bold transition-all duration-300 group-hover:translate-x-16">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 