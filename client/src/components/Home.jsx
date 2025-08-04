import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [hairCarePlan, setHairCarePlan] = useState(null);
  const [isPlanExpanded, setIsPlanExpanded] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const navigate = useNavigate();

  // Generate personalized hair care plan based on quiz answers
  const generateHairCarePlan = (answers) => {
    const hairType = answers[0];
    const scalpType = answers[1];
    const concerns = answers[2] || [];
    const washFrequency = answers[3];
    const styling = answers[4];
    const treatments = answers[5];
    const goals = answers[6];

    let plan = {
      title: "Your Hair Care Plan",
      subtitle: "Based on your recent quiz",
      progress: 72,
      tasks: [],
      recommendations: []
    };

    // Generate tasks based on hair type and concerns
    if (hairType && hairType.includes("Wavy")) {
      plan.tasks.push("Moisture retention focus");
      plan.tasks.push("Curl definition enhancement");
      plan.tasks.push("Frizz control management");
      plan.recommendations.push("Use leave-in conditioner for curl definition");
      plan.recommendations.push("Apply curl cream to maintain shape");
      plan.recommendations.push("Use wide-tooth comb for detangling");
    } else if (hairType && hairType.includes("Curly")) {
      plan.tasks.push("Curl pattern enhancement");
      plan.tasks.push("Deep moisture treatment");
      plan.tasks.push("Curl clumping technique");
      plan.recommendations.push("Apply curl cream to maintain shape");
      plan.recommendations.push("Use co-washing method");
      plan.recommendations.push("Apply gel for hold and definition");
    } else if (hairType && hairType.includes("Straight")) {
      plan.tasks.push("Volume and texture building");
      plan.tasks.push("Smoothness enhancement");
      plan.tasks.push("Oil balance maintenance");
      plan.recommendations.push("Use volumizing products for body");
      plan.recommendations.push("Apply smoothing serum");
      plan.recommendations.push("Use dry shampoo for volume");
    } else if (hairType && hairType.includes("Coily")) {
      plan.tasks.push("Intensive moisture treatment");
      plan.tasks.push("Shrinkage management");
      plan.tasks.push("Length retention focus");
      plan.recommendations.push("Use heavy cream moisturizers");
      plan.recommendations.push("Apply oil to seal moisture");
      plan.recommendations.push("Use protective styling methods");
    }

    // Add scalp-specific tasks
    if (scalpType === "Oily") {
      plan.tasks.push("Scalp oil control");
      plan.tasks.push("Clarifying treatment");
      plan.tasks.push("Oil production regulation");
      plan.recommendations.push("Use clarifying shampoo twice weekly");
      plan.recommendations.push("Apply scalp toner");
      plan.recommendations.push("Use dry shampoo between washes");
    } else if (scalpType === "Dry") {
      plan.tasks.push("Scalp hydration treatment");
      plan.tasks.push("Moisture barrier repair");
      plan.tasks.push("Gentle cleansing routine");
      plan.recommendations.push("Apply scalp oil before washing");
      plan.recommendations.push("Use moisturizing shampoo");
      plan.recommendations.push("Apply scalp serum");
    } else if (scalpType === "Sensitive") {
      plan.tasks.push("Gentle scalp care");
      plan.tasks.push("Irritation prevention");
      plan.tasks.push("Soothing treatment");
      plan.recommendations.push("Use fragrance-free, gentle products");
      plan.recommendations.push("Apply aloe vera gel");
      plan.recommendations.push("Use lukewarm water only");
    } else if (scalpType === "Itchy/Flaky") {
      plan.tasks.push("Scalp exfoliation");
      plan.tasks.push("Anti-inflammatory treatment");
      plan.tasks.push("Flake removal");
      plan.recommendations.push("Use anti-dandruff shampoo");
      plan.recommendations.push("Apply tea tree oil treatment");
      plan.recommendations.push("Use scalp scrub weekly");
    } else if (scalpType === "Normal") {
      plan.tasks.push("Scalp health maintenance");
      plan.tasks.push("Balanced care routine");
      plan.tasks.push("Preventive treatment");
      plan.recommendations.push("Use pH-balanced shampoo");
      plan.recommendations.push("Apply scalp massage");
      plan.recommendations.push("Use gentle cleansing");
    }

    // Add concern-specific tasks
    if (concerns.includes("Hair fall")) {
      plan.tasks.push("Hair fall prevention");
      plan.tasks.push("Scalp stimulation");
      plan.tasks.push("Root strengthening");
      plan.recommendations.push("Use strengthening treatments");
      plan.recommendations.push("Apply scalp massage daily");
      plan.recommendations.push("Use biotin supplements");
    }
    if (concerns.includes("Dandruff or flaky scalp")) {
      plan.tasks.push("Scalp exfoliation");
      plan.tasks.push("Anti-fungal treatment");
      plan.tasks.push("Moisture balance");
      plan.recommendations.push("Use anti-dandruff shampoo");
      plan.recommendations.push("Apply apple cider vinegar rinse");
      plan.recommendations.push("Use zinc pyrithione treatment");
    }
    if (concerns.includes("Frizz or dryness")) {
      plan.tasks.push("Moisture lock-in");
      plan.tasks.push("Humidity protection");
      plan.tasks.push("Smoothness enhancement");
      plan.recommendations.push("Apply hair oil to seal moisture");
      plan.recommendations.push("Use anti-humidity products");
      plan.recommendations.push("Apply leave-in conditioner");
    }
    if (concerns.includes("Thinning")) {
      plan.tasks.push("Hair density support");
      plan.tasks.push("Volume enhancement");
      plan.tasks.push("Growth stimulation");
      plan.recommendations.push("Use growth-stimulating products");
      plan.recommendations.push("Apply minoxidil treatment");
      plan.recommendations.push("Use volumizing products");
    }
    if (concerns.includes("Breakage or split ends")) {
      plan.tasks.push("End protection");
      plan.tasks.push("Protein treatment");
      plan.tasks.push("Damage repair");
      plan.recommendations.push("Use protein treatments");
      plan.recommendations.push("Apply hair masks weekly");
      plan.recommendations.push("Use heat protection");
    }
    if (concerns.includes("Greasy scalp")) {
      plan.tasks.push("Oil control");
      plan.tasks.push("Clarifying routine");
      plan.tasks.push("Balance restoration");
      plan.recommendations.push("Use clarifying shampoo");
      plan.recommendations.push("Apply dry shampoo");
      plan.recommendations.push("Use sulfate-free products");
    }

    // Add goal-specific tasks
    if (goals === "Reduce hair fall") {
      plan.tasks.push("Hair fall reduction");
      plan.tasks.push("Scalp health optimization");
      plan.tasks.push("Stress management");
      plan.recommendations.push("Use biotin-rich products");
      plan.recommendations.push("Apply scalp massage");
      plan.recommendations.push("Use rosemary oil treatment");
    } else if (goals === "Grow longer hair") {
      plan.tasks.push("Length retention focus");
      plan.tasks.push("End protection");
      plan.tasks.push("Growth acceleration");
      plan.recommendations.push("Protect ends with regular trims");
      plan.recommendations.push("Use growth supplements");
      plan.recommendations.push("Apply castor oil treatment");
    } else if (goals === "Get shinier/smoother texture") {
      plan.tasks.push("Smoothness enhancement");
      plan.tasks.push("Shine amplification");
      plan.tasks.push("Texture refinement");
      plan.recommendations.push("Use smoothing serums");
      plan.recommendations.push("Apply shine treatments");
      plan.recommendations.push("Use silk pillowcase");
    } else if (goals === "Treat dandruff/flakes") {
      plan.tasks.push("Dandruff elimination");
      plan.tasks.push("Scalp soothing");
      plan.tasks.push("Prevention routine");
      plan.recommendations.push("Use medicated shampoo");
      plan.recommendations.push("Apply tea tree oil");
      plan.recommendations.push("Use scalp scrub");
    } else if (goals === "Thicker or fuller look") {
      plan.tasks.push("Volume enhancement");
      plan.tasks.push("Density improvement");
      plan.tasks.push("Body building");
      plan.recommendations.push("Use volumizing products");
      plan.recommendations.push("Apply root lifting spray");
      plan.recommendations.push("Use texturizing products");
    } else if (goals === "Maintain current condition") {
      plan.tasks.push("Maintenance routine");
      plan.tasks.push("Preventive care");
      plan.tasks.push("Health preservation");
      plan.recommendations.push("Use gentle cleansing");
      plan.recommendations.push("Apply regular conditioning");
      plan.recommendations.push("Use protective styling");
    }

    // Add wash frequency recommendations
    if (washFrequency === "Daily") {
      plan.tasks.push("Gentle daily cleansing");
      plan.recommendations.push("Use gentle daily shampoo");
      plan.recommendations.push("Apply lightweight conditioner");
    } else if (washFrequency === "Every 2–3 days") {
      plan.tasks.push("Balanced cleansing routine");
      plan.recommendations.push("Use sulfate-free shampoo");
      plan.recommendations.push("Apply deep conditioner");
    } else if (washFrequency === "Once a week") {
      plan.tasks.push("Deep cleansing treatment");
      plan.recommendations.push("Use deep cleansing shampoo");
      plan.recommendations.push("Apply intensive hair mask");
    } else if (washFrequency === "Less often") {
      plan.tasks.push("Minimal washing approach");
      plan.recommendations.push("Use co-washing method");
      plan.recommendations.push("Apply dry shampoo");
    }

    // Add styling-specific tasks
    if (styling === "Air dry, natural") {
      plan.tasks.push("Natural drying optimization");
      plan.recommendations.push("Use microfiber towel");
      plan.recommendations.push("Apply leave-in conditioner");
    } else if (styling === "Blow dry or straighten") {
      plan.tasks.push("Heat protection focus");
      plan.recommendations.push("Use heat protection spray");
      plan.recommendations.push("Apply thermal protectant");
    } else if (styling === "Use curlers or curling irons") {
      plan.tasks.push("Heat damage prevention");
      plan.recommendations.push("Use heat protection cream");
      plan.recommendations.push("Apply thermal serum");
    } else if (styling === "Chemical treatments") {
      plan.tasks.push("Chemical damage repair");
      plan.recommendations.push("Use protein treatments");
      plan.recommendations.push("Apply deep conditioning");
    } else if (styling === "Protective styles") {
      plan.tasks.push("Protective styling care");
      plan.recommendations.push("Use edge control");
      plan.recommendations.push("Apply scalp oil");
    }

    // Add treatment-specific tasks
    if (treatments === "Yes, regularly") {
      plan.tasks.push("Treatment optimization");
      plan.recommendations.push("Rotate different treatments");
      plan.recommendations.push("Monitor treatment results");
    } else if (treatments === "Sometimes") {
      plan.tasks.push("Treatment integration");
      plan.recommendations.push("Start with gentle treatments");
      plan.recommendations.push("Gradually increase frequency");
    } else if (treatments === "Never tried") {
      plan.tasks.push("Treatment introduction");
      plan.recommendations.push("Start with basic treatments");
      plan.recommendations.push("Consult with hair specialist");
    } else if (treatments === "I didn't know I could!") {
      plan.tasks.push("Treatment education");
      plan.recommendations.push("Learn about hair treatments");
      plan.recommendations.push("Start with simple treatments");
    }

    // Ensure we have at least 6 tasks for comprehensive care
    while (plan.tasks.length < 6) {
      plan.tasks.push("General hair health maintenance");
    }

    // Limit to top 6 most important tasks for display
    plan.tasks = plan.tasks.slice(0, 6);

    return plan;
  };

  // Calculate progress based on completed tasks
  const calculateProgress = () => {
    if (!hairCarePlan) return 0;
    const totalTasks = hairCarePlan.tasks.length;
    const completedCount = completedTasks.size;
    return Math.round((completedCount / totalTasks) * 100);
  };

  // Handle task completion
  const handleTaskToggle = (taskIndex) => {
    const newCompletedTasks = new Set(completedTasks);
    if (newCompletedTasks.has(taskIndex)) {
      newCompletedTasks.delete(taskIndex);
    } else {
      newCompletedTasks.add(taskIndex);
    }
    setCompletedTasks(newCompletedTasks);
  };

  useEffect(() => {
    // Get quiz results from localStorage
    const quizResults = localStorage.getItem('quizResults');
    if (quizResults) {
      const answers = JSON.parse(quizResults);
      setUserProfile(answers);
      
      // Generate personalized hair care plan
      const plan = generateHairCarePlan(answers);
      setHairCarePlan(plan);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('quizResults');
    localStorage.removeItem('scalpPhotoSubmitted');
    navigate('/');
  };

  const handleViewRecommendations = () => {
    // Navigate to recommendations page (to be created)
    console.log('Navigate to recommendations');
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('quizResults');
    navigate('/quiz');
  };

  const currentProgress = calculateProgress();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mr-3"></div>
              <h1 
                className="text-2xl font-bold text-black"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  letterSpacing: '0.15em'
                }}
              >
                Follicure
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 text-gray-600">
                🔔
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 text-gray-600">
                ▼
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Good morning, Sophia!
            </h2>
            <p className="text-gray-600 text-lg">
              Here's your hair care journey for today
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleRetakeQuiz}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="text-lg">🔄</span>
              <span>Retake Quiz</span>
            </button>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
              <span className="text-xl">+</span>
              <span>Update Hair Journal</span>
            </button>
          </div>
        </div>

        {/* Floating Retake Quiz Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <button 
            onClick={handleRetakeQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <span className="text-xl">🔄</span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Your Hair Care Plan Card */}
          {hairCarePlan && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative">
              {/* Retake Quiz Badge */}
              <div className="absolute -top-3 -right-3">
                <button 
                  onClick={handleRetakeQuiz}
                  className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:from-orange-500 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Update Profile
                </button>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">{hairCarePlan.title}</h3>
                  <p className="text-gray-600 text-sm">{hairCarePlan.subtitle}</p>
                </div>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{currentProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${currentProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist - Collapsed View */}
              {!isPlanExpanded && (
                <div className="space-y-3 mb-6">
                  {hairCarePlan.tasks.slice(0, 3).map((task, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTaskToggle(index)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                          completedTasks.has(index) 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        {completedTasks.has(index) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                      <span className={`text-sm transition-all duration-200 ${
                        completedTasks.has(index) ? 'text-gray-500 line-through' : 'text-gray-800'
                      }`}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Expanded View */}
              {isPlanExpanded && (
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Complete Hair Care Plan</h4>
                  {hairCarePlan.tasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTaskToggle(index)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                          completedTasks.has(index) 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        {completedTasks.has(index) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                      <span className={`text-sm transition-all duration-200 ${
                        completedTasks.has(index) ? 'text-gray-500 line-through' : 'text-gray-800'
                      }`}>
                        {task}
                      </span>
                    </div>
                  ))}
                  
                  {/* Recommendations Section */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Product Recommendations</h4>
                    <div className="space-y-2">
                      {hairCarePlan.recommendations.slice(0, 5).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-blue-500 text-sm">💡</span>
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setIsPlanExpanded(!isPlanExpanded)}
                className="w-full border border-red-300 text-black py-3 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{isPlanExpanded ? 'Show Less' : 'View Full Plan'}</span>
                <span className={`transition-transform duration-300 ${isPlanExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            </div>
          )}

          {/* Placeholder for other cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-4">Today's Routine</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-4">Scalp Analyzer</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-4">Diet & Nutrition</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-4">Your Progress</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-4">Community Stories</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 