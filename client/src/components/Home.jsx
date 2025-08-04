import React from 'react';

const Home = () => {
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
      <div 
        className="relative z-10 bg-white/30 backdrop-blur-sm rounded-2xl p-12 shadow-2xl mx-auto border border-white/50"
        style={{ width: '50%' }}
      >
        <div className="flex flex-col items-center space-y-8">
          <h1 
            className="text-4xl font-bold leading-tight text-center"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.15em',
              fontWeight: '600',
              color: '#000000'
            }}
          >
            Welcome to FlolliCure
          </h1>
          
          <p className="text-xl text-gray-800 text-center leading-relaxed">
            Thank you for completing the quiz! We've personalized your experience based on your hair profile.
          </p>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Your Personalized Recommendations</h2>
            <p className="text-lg text-gray-700">
              Based on your quiz results, we've curated the perfect products for your hair type and concerns.
            </p>
          </div>

          <button
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            style={{
              backgroundColor: '#EA454C',
              background: 'linear-gradient(135deg, #EA454C, #d13a41)'
            }}
          >
            View My Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 