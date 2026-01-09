// src/pages/QuizPage.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Settings, RefreshCw, Check, X, Trophy, ArrowRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { initAudio, playSound, speak } from '../utils/audioUtils';

// Helper for UI colors
const getTheme = (colorName) => {
  const themes = {
    indigo: { bg: 'bg-indigo-600', bgLight: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', btn: 'bg-indigo-600' },
    pink: { bg: 'bg-pink-500', bgLight: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', btn: 'bg-pink-500' },
    emerald: { bg: 'bg-emerald-600', bgLight: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200', btn: 'bg-emerald-600' },
    amber: { bg: 'bg-amber-500', bgLight: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200', btn: 'bg-amber-500' },
  };
  return themes[colorName] || themes.indigo;
};

export default function QuizPage({ type, data, title, colorClass, onBack }) {
  // State initialization
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem(`highscore-${type}`) || '0'));
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  // Quiz Logic State
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // 'mode' determines question direction: 'char-to-ans' or 'ans-to-char'
  // For Kanji/Vocab, 'ans' can be Meaning or Romaji
  const [mode, setMode] = useState('char-to-ans'); 

  const theme = getTheme(colorClass);

  // Save highscore
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(`highscore-${type}`, score);
    }
  }, [score, highScore, type]);

  const generateQuestion = useCallback(() => {
    if (!data || data.length === 0) return;

    const question = data[Math.floor(Math.random() * data.length)];
    let newOptions = [question];
    
    // Generate 3 random wrong options
    while (newOptions.length < 4) {
      const randomOpt = data[Math.floor(Math.random() * data.length)];
      if (!newOptions.find(o => o.char === randomOpt.char)) {
        newOptions.push(randomOpt);
      }
    }
    newOptions.sort(() => Math.random() - 0.5);

    setCurrentQuestion(question);
    setOptions(newOptions);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [data]);

  // Initial load
  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleAnswer = (option) => {
    if (isAnswered) return;
    initAudio();
    setIsAnswered(true);
    setSelectedOption(option);
    
    const isCorrect = option.char === currentQuestion.char;
    
    if (navigator.vibrate) navigator.vibrate(isCorrect ? 50 : 200);
    
    if (isCorrect) {
      if (audioEnabled) playSound('correct');
      setScore(s => s + 1);
    } else {
      if (audioEnabled) playSound('wrong');
      setWrong(w => w + 1);
    }
  };

  // Helper to determine what text to show on button
  const getOptionLabel = (opt) => {
    if (mode === 'char-to-ans') {
        // If question is Character, Answer is Romaji OR Meaning (for Kanji/Vocab)
        return opt.meaning ? `${opt.meaning} (${opt.romaji})` : opt.romaji;
    } else {
        return opt.char;
    }
  };

  const getQuestionLabel = () => {
    if (!currentQuestion) return '';
    if (mode === 'char-to-ans') return currentQuestion.char;
    return currentQuestion.meaning || currentQuestion.romaji;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bn-font pt-10 pb-20">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        
        {/* HEADER */}
        <div className={`${theme.bg} p-6 text-white relative`}>
          <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white/20 rounded-lg hover:bg-white/30 backdrop-blur-sm z-20">
            <ChevronLeft size={20} />
          </button>
          
          <div className="relative z-10 flex flex-col items-center mt-2">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
              <Trophy size={14} /> সেরা: {highScore}
            </div>
          </div>

          <div className="absolute top-6 right-6 z-20">
             <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
               <Settings size={20} />
             </button>
          </div>

          {/* Score Board */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg">
              <Check size={16} className="text-green-300" /> <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg">
               <X size={16} className="text-red-300" /> <span className="font-bold">{wrong}</span>
            </div>
          </div>
        </div>

        {/* SETTINGS DRAWER */}
        {showSettings && (
           <div className="bg-slate-50 border-b p-4 animate-in slide-in-from-top-2">
             <div className="flex justify-between items-center">
               <button onClick={() => setAudioEnabled(!audioEnabled)} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                 {audioEnabled ? <Volume2 size={16}/> : <VolumeX size={16}/>} সাউন্ড
               </button>
               <button onClick={() => setMode(mode === 'char-to-ans' ? 'ans-to-char' : 'char-to-ans')} className="text-sm bg-white border px-3 py-1 rounded shadow-sm">
                 মোড পরিবর্তন: {mode === 'char-to-ans' ? 'JP → EN' : 'EN → JP'}
               </button>
             </div>
           </div>
        )}

        {/* QUIZ BODY */}
        <div className="p-6">
          {!currentQuestion ? <div className="text-center py-10">Loading...</div> : (
            <>
              {/* Question Card */}
              <div className="flex justify-center mb-8 relative">
                <button onClick={() => speak(currentQuestion.char)} className="absolute right-0 top-0 p-3 bg-slate-100 rounded-full hover:bg-slate-200">
                   <Volume2 size={24} className="text-slate-600"/>
                </button>
                
                <div 
                  className={`w-40 h-40 bg-white rounded-[2rem] shadow-xl border-4 ${theme.border} flex items-center justify-center cursor-pointer`}
                  onClick={() => speak(currentQuestion.char)}
                >
                  <span className={`font-bold ${theme.text} ${mode === 'ans-to-char' && !currentQuestion.meaning ? 'text-4xl' : 'text-6xl sm:text-7xl'} text-center p-2`}>
                    {getQuestionLabel()}
                  </span>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {options.map((opt, idx) => {
                  const isCorrect = opt.char === currentQuestion.char;
                  const isSelected = selectedOption === opt;
                  
                  let btnClass = "relative w-full p-4 rounded-xl text-lg font-bold transition-all border-2 ";
                  if (!isAnswered) {
                    btnClass += `bg-white ${theme.border} text-slate-700 hover:shadow-md hover:-translate-y-1`;
                  } else if (isCorrect) {
                    btnClass += "bg-green-500 border-green-600 text-white shadow-md";
                  } else if (isSelected) {
                    btnClass += "bg-red-500 border-red-600 text-white shadow-md";
                  } else {
                    btnClass += "bg-slate-50 border-slate-200 text-slate-300";
                  }

                  return (
                    <button key={idx} onClick={() => handleAnswer(opt)} className={btnClass} disabled={isAnswered}>
                      {getOptionLabel(opt)}
                      {isAnswered && isCorrect && <div className="absolute right-3 top-3 text-white"><Check size={20}/></div>}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="h-16 flex items-center justify-center">
                {isAnswered ? (
                  <button onClick={generateQuestion} className={`${theme.btn} text-white px-8 py-3 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2`}>
                    পরের প্রশ্ন <ArrowRight size={18} />
                  </button>
                ) : (
                  <p className="text-slate-400 text-sm animate-pulse">সঠিক উত্তরটি বেছে নিন</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
      }
