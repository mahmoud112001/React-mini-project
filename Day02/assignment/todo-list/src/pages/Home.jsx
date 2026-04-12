import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";

export default function Home({ tasks }) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  const completed = tasks.filter((t) => t.completed).length;
  const active = tasks.filter((t) => !t.completed).length;
  const percent = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get motivational message based on progress
  const getMotivation = () => {
    if (tasks.length === 0) return "Ready to conquer the day? Add your first task!";
    if (percent === 100) return "Fantastic! All tasks completed! 🎉";
    if (percent >= 75) return "Almost there! Keep the momentum going!";
    if (percent >= 50) return "Great progress! You're halfway done!";
    if (percent >= 25) return "Nice start! Keep building momentum!";
    return "Let's get started! You've got this!";
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4 max-w-md mx-auto">
      {/* Hero Section with Staggered Animation */}
      <div className={`mb-8 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
        {/* Greeting */}
        <div className="mb-2">
          <p className="text-sm font-mono text-gray-500 tracking-wide uppercase">
            {getGreeting()}
          </p>
        </div>
        
        {/* User Name */}
        <h1 className="text-4xl font-bold mb-3 gradient-text">
          {user?.name || 'Welcome'}
        </h1>
        
        {/* Motivation Message */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {getMotivation()}
        </p>
      </div>

      {/* Progress Card with Enhanced Design */}
      <div className={`mb-6 ${mounted ? 'animate-scale-in stagger-1' : 'opacity-0'}`}>
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover">
          {/* Background Gradient Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-3xl opacity-50 -z-10" />
          
          {/* Progress Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wide mb-1">
                Progress
              </h3>
              <p className="text-3xl font-bold gradient-text">
                {percent}%
              </p>
            </div>
            
            {/* Circular Progress Indicator */}
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - percent / 100)}`}
                  className="text-green-600 transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">{completed}/{tasks.length}</span>
              </div>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out shadow-md"
              style={{ width: `${percent}%` }}
            >
              {/* Animated Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
            </div>
          </div>

          {/* Tasks Summary */}
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">
              {completed} completed · {active} remaining
            </span>
            {tasks.length > 0 && (
              <span className="text-gray-400 font-mono">
                {tasks.length} total
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid with Staggered Animation */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Active Tasks Card */}
        <div className={`bg-white rounded-xl p-5 shadow-md border border-gray-100 card-hover ${mounted ? 'animate-scale-in stagger-2' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-clock text-green-600"></i>
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{active}</p>
          <p className="text-xs text-gray-500">Tasks in progress</p>
        </div>

        {/* Completed Tasks Card */}
        <div className={`bg-white rounded-xl p-5 shadow-md border border-gray-100 card-hover ${mounted ? 'animate-scale-in stagger-3' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-check text-white"></i>
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">Done</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{completed}</p>
          <p className="text-xs text-gray-500">Tasks finished</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`space-y-3 ${mounted ? 'animate-slide-up stagger-4' : 'opacity-0'}`}>
        {/* Add Task Button */}
        <Link
          to="/tasks"
          className="group relative block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl py-4 px-6 font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden btn-ripple"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            <i className="fa-solid fa-plus text-lg group-hover:rotate-90 transition-transform duration-300"></i>
            <span className="text-base">Add New Task</span>
          </div>
          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* View All Tasks Button */}
        <Link
          to="/tasks"
          className="block w-full bg-white hover:bg-gray-50 text-gray-700 rounded-xl py-4 px-6 font-medium text-center border-2 border-gray-200 hover:border-green-300 transition-all duration-300 card-hover"
        >
          <div className="flex items-center justify-center gap-2">
            <i className="fa-solid fa-list-check"></i>
            <span>View All Tasks</span>
          </div>
        </Link>
      </div>

      {/* Achievement Badge (if all tasks completed) */}
      {percent === 100 && tasks.length > 0 && (
        <div className="mt-8 animate-scale-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center shadow-xl">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
              <i className="fa-solid fa-trophy text-3xl text-yellow-500"></i>
            </div>
            <h3 className="font-bold text-lg mb-1">All Done!</h3>
            <p className="text-sm text-green-50">
              You've completed all your tasks. Time to celebrate! 🎉
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className={`mt-8 text-center ${mounted ? 'animate-fade-in stagger-5' : 'opacity-0'}`}>
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center floating">
            <i className="fa-solid fa-clipboard-list text-3xl text-gray-400"></i>
          </div>
          <p className="text-gray-500 text-sm mb-2">No tasks yet</p>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Start organizing your day by adding your first task above
          </p>
        </div>
      )}
    </div>
  );
}