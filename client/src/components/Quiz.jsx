import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is your natural hair type?",
      options: [
        "Straight (Type 1)",
        "Wavy (Type 2)", 
        "Curly (Type 3)",
        "Coily (Type 4)",
        "Not sure"
      ],
      type: "single"
    },
    {
      id: 2,
      question: "What is your scalp type?",
      options: [
        "Oily",
        "Dry", 
        "Normal",
        "Itchy/Flaky",
        "Sensitive"
      ],
      type: "single"
    },
    {
      id: 3,
      question: "What hair concern are you currently experiencing?",
      options: [
        "Hair fall",
        "Dandruff or flaky scalp",
        "Frizz or dryness",
        "Thinning",
        "Breakage or split ends",
        "Greasy scalp"
      ],
      type: "multiple"
    },
    {
      id: 4,
      question: "How often do you wash your hair?",
      options: [
        "Daily",
        "Every 2–3 days",
        "Once a week",
        "Less often"
      ],
      type: "single"
    },
    {
      id: 5,
      question: "How do you typically style your hair?",
      options: [
        "Air dry, natural",
        "Blow dry or straighten",
        "Use curlers or curling irons",
        "Chemical treatments (e.g. coloring, rebonding)",
        "Protective styles (braids, buns, etc.)"
      ],
      type: "single"
    },
    {
      id: 6,
      question: "Do you take any hair supplements or use treatments?",
      options: [
        "Yes, regularly",
        "Sometimes",
        "Never tried",
        "I didn't know I could!"
      ],
      type: "single"
    },
    {
      id: 7,
      question: "What are your hair goals?",
      options: [
        "Reduce hair fall",
        "Grow longer hair",
        "Get shinier/smoother texture",
        "Treat dandruff/flakes",
        "Thicker or fuller look",
        "Maintain current condition"
      ],
      type: "single"
    }
  ];

  const handleAnswer = (answer) => {
    if (questions[currentQuestion].type === "multiple") {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: prev[currentQuestion] 
          ? [...prev[currentQuestion], answer]
          : [answer]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getResults = () => {
    const hairType = answers[0];
    const scalpType = answers[1];
    const concerns = answers[2] || [];
    const washFrequency = answers[3];
    const styling = answers[4];
    const treatments = answers[5];
    const goals = answers[6];

    let recommendation = "";
    let product = "";

    // Personalized recommendations based on answers
    if (hairType && scalpType) {
      if (scalpType === "Oily" && concerns.includes("Hair fall")) {
        recommendation = "Your oily scalp and hair fall indicate a need for weekly exfoliation.";
        product = "Try our Scalp Detox Kit.";
      } else if (hairType.includes("Wavy") && concerns.includes("Frizz or dryness")) {
        recommendation = "You're experiencing dryness and frizz with Type 2 wavy hair.";
        product = "Our Follicure Hydration Boost Serum is a great match.";
      } else if (scalpType === "Dry" && concerns.includes("Dandruff or flaky scalp")) {
        recommendation = "Your dry scalp and dandruff need gentle, moisturizing care.";
        product = "Try our Nourishing Scalp Treatment.";
      } else if (concerns.includes("Thinning")) {
        recommendation = "For thinning hair, you need products that promote growth and volume.";
        product = "Our Hair Growth Stimulator is perfect for you.";
      } else {
        recommendation = "Based on your hair profile, we recommend a personalized care routine.";
        product = "Try our Custom Hair Care Kit.";
      }
    }

    return { recommendation, product };
  };

  const handleComplete = () => {
    // Save quiz results to localStorage or Firebase
    localStorage.setItem('quizCompleted', 'true');
    localStorage.setItem('quizResults', JSON.stringify(answers));
    
    // Redirect to home page
    navigate('/home');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const { recommendation, product } = getResults();
    
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div 
          className="bg-white rounded-2xl p-12 shadow-2xl mx-auto border border-gray-200"
          style={{ width: '50%' }}
        >
          <div className="flex flex-col items-center space-y-8">
            <h1 
              className="text-4xl font-bold leading-tight text-center"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '0.15em',
                fontWeight: '600',
                color: '#EA454C'
              }}
            >
              Your Personalized Results
            </h1>
            
            <div className="text-center space-y-6">
              <p className="text-xl text-gray-800 leading-relaxed">
                {recommendation}
              </p>
              <p className="text-lg text-red-600 font-semibold">
                {product}
              </p>
            </div>

            {/* Discount Code */}
            <div className="bg-red-500 text-white p-6 rounded-lg text-center w-full">
              <h3 className="text-xl font-bold mb-2">🎉 Quiz Complete!</h3>
              <p className="text-lg">Use code: <span className="font-bold">QUIZ20</span> for 20% off your first order!</p>
            </div>

            <button
              onClick={handleComplete}
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Continue to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div 
        className="bg-white rounded-2xl p-12 shadow-2xl mx-auto border border-gray-200"
        style={{ width: '50%' }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <h1 
            className="text-3xl font-bold leading-tight text-center"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.15em',
              fontWeight: '600',
              color: '#EA454C'
            }}
          >
            {currentQ.question}
          </h1>

          <div className="w-full space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentQ.type === "multiple" 
                    ? answers[currentQuestion]?.includes(option)
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-300'
                    : answers[currentQuestion] === option
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-300'
                }`}
              >
                <span className="font-medium text-gray-800">{option}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between w-full pt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                !answers[currentQuestion]
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 