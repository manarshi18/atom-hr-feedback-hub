
// Using vanilla JS approach within React framework to maintain compatibility

import { useState } from "react";
import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";
import ProgressRing from "@/components/ProgressRing";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          username="andu" 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={isDarkMode} 
        />
        
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center">
                  <span className="text-3xl">👋</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Welcome, <span className="text-blue-600">andu</span>!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Organize your work and improve team performance
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <ProgressRing progress={75} />
                <span className="font-bold">Dashboard Setup</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Employee Feedback</h2>
              <FeedbackForm />
            </div>
          </div>
        </main>
        
        <Toaster />
      </div>
    </div>
  );
};

export default Index;
