// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import { hiraganaData, katakanaData, kanjiData, vocabData } from './data/quizData';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  // Handle Browser Back Button
  useEffect(() => {
    if (currentView !== 'home') {
      window.history.pushState({ view: currentView }, '');
    }
    const handlePopState = () => {
      if (currentView !== 'home') setCurrentView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  const handleBack = () => {
    if (window.history.state) window.history.back();
    else setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Font imports via Style tag for simplicity */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Hind+Siliguri:wght@400;600;700&display=swap');
        .jp-font { font-family: 'Noto Sans JP', sans-serif; }
        .bn-font { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {currentView === 'home' && (
        <HomePage onSelect={setCurrentView} />
      )}

      {currentView === 'hiragana' && (
        <QuizPage 
          type="hiragana" data={hiraganaData} title="হিরাগানা" 
          colorClass="indigo" onBack={handleBack} 
        />
      )}

      {currentView === 'katakana' && (
        <QuizPage 
          type="katakana" data={katakanaData} title="কাতাকানা" 
          colorClass="pink" onBack={handleBack} 
        />
      )}

      {currentView === 'kanji' && (
        <QuizPage 
          type="kanji" data={kanjiData} title="কাঞ্জি (N5)" 
          colorClass="emerald" onBack={handleBack} 
        />
      )}

      {currentView === 'vocab' && (
        <QuizPage 
          type="vocab" data={vocabData} title="ভোকাবুলারি" 
          colorClass="amber" onBack={handleBack} 
        />
      )}
    </div>
  );
}
