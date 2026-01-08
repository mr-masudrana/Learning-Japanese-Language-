import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Settings, RefreshCw, Check, X, Trophy, ArrowRight, ChevronLeft, Volume2, VolumeX, Book, PenTool, RotateCcw, Star } from 'lucide-react';

// --- DATA SOURCES (Same data as before) ---
// ... (Data arrays: hiraganaData, katakanaData, kanjiData, vocabData are kept same)
const hiraganaData = [
  { char: 'あ', romaji: 'a', type: 'basic' }, { char: 'い', romaji: 'i', type: 'basic' }, { char: 'う', romaji: 'u', type: 'basic' }, { char: 'え', romaji: 'e', type: 'basic' }, { char: 'お', romaji: 'o', type: 'basic' },
  { char: 'か', romaji: 'ka', type: 'basic' }, { char: 'き', romaji: 'ki', type: 'basic' }, { char: 'く', romaji: 'ku', type: 'basic' }, { char: 'け', romaji: 'ke', type: 'basic' }, { char: 'こ', romaji: 'ko', type: 'basic' },
  // ... (keeping data concise for preview, assume full data exists)
   { char: 'さ', romaji: 'sa', type: 'basic' }, { char: 'し', romaji: 'shi', type: 'basic' }, { char: 'す', romaji: 'su', type: 'basic' }, { char: 'せ', romaji: 'se', type: 'basic' }, { char: 'そ', romaji: 'so', type: 'basic' },
   { char: 'が', romaji: 'ga', type: 'dakuten' }, { char: 'ぎ', romaji: 'gi', type: 'dakuten' },
   { char: 'きゃ', romaji: 'kya', type: 'combo' }, { char: 'きゅ', romaji: 'kyu', type: 'combo' }
];
const katakanaData = [{ char: 'ア', romaji: 'a', type: 'basic' }, { char: 'イ', romaji: 'i', type: 'basic' }]; // Mock for brevity
const kanjiData = [{ char: '日', romaji: 'দিন (nichi)', type: 'nature' }]; // Mock
const vocabData = [{ char: 'ありがとう', romaji: 'ধন্যবাদ', type: 'greetings' }]; // Mock

// Helper to expand data for demo purposes if needed, strictly using provided structure in real app
// For this code block, I will use a combined data approach for the snippet to work fully. 
// In your actual file, keep the full data arrays you already have.

// --- HELPER CONFIG ---
const getCategoriesForType = (type) => {
  switch(type) {
    case 'hiragana':
    case 'katakana':
      return [{ key: 'basic', label: 'বেসিক' }, { key: 'dakuten', label: 'টেনটেন' }, { key: 'combo', label: 'যুক্তবর্ণ' }];
    case 'kanji':
      return [{ key: 'numbers', label: 'সংখ্যা' }, { key: 'nature', label: 'প্রকৃতি' }, { key: 'people', label: 'মানুষ' }];
    case 'vocab':
      return [{ key: 'greetings', label: 'শুভেচ্ছা' }, { key: 'common', label: 'সাধারণ' }, { key: 'animals', label: 'প্রাণী' }];
    default: return [];
  }
};

// --- MAIN APP ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    if (currentView !== 'home') window.history.pushState({ view: currentView }, '');
    const handlePop = () => { if (currentView !== 'home') setCurrentView('home'); };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Hind+Siliguri:wght@400;600;700&display=swap');
        .jp-font { font-family: 'Noto Sans JP', sans-serif; }
        .bn-font { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {currentView === 'home' && <HomePage onSelect={setCurrentView} />}
      
      {/* Passing full data arrays here. In real usage, ensure arrays are populated */}
      {currentView === 'hiragana' && <QuizPage type="hiragana" data={hiraganaData} title="হিরাগানা" colorClass="indigo" onBack={() => window.history.back()} />}
      {currentView === 'katakana' && <QuizPage type="katakana" data={katakanaData} title="কাতাকানা" colorClass="pink" onBack={() => window.history.back()} />}
      {currentView === 'kanji' && <QuizPage type="kanji" data={kanjiData} title="কাঞ্জি" colorClass="amber" onBack={() => window.history.back()} />}
      {currentView === 'vocab' && <QuizPage type="vocab" data={vocabData} title="ভোকাবুলারি" colorClass="emerald" onBack={() => window.history.back()} />}
    </div>
  );
}

// --- HOME PAGE ---
const HomePage = ({ onSelect }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bn-font bg-slate-50">
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">জাপানি ভাষা শিখুন</h1>
      <p className="text-slate-500">আপনার শেখার যাত্রা শুরু করতে একটি কুইজ বেছে নিন</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <HomeCard title="হিরাগানা" subtitle="বেসিক বর্ণমালা" char="あ" color="indigo" onClick={() => onSelect('hiragana')} />
      <HomeCard title="কাতাকানা" subtitle="বিদেশি শব্দ" char="ア" color="pink" onClick={() => onSelect('katakana')} />
      <HomeCard title="কাঞ্জি" subtitle="N5 লেভেল" char="日" color="amber" onClick={() => onSelect('kanji')} icon={<Book size={28}/>} />
      <HomeCard title="ভোকাবুলারি" subtitle="শব্দভান্ডার" char="A" color="emerald" onClick={() => onSelect('vocab')} icon={<PenTool size={28}/>} />
    </div>
  </div>
);

const HomeCard = ({ title, subtitle, char, color, onClick, icon }) => {
  const themes = {
    indigo: 'bg-indigo-100 text-indigo-600', pink: 'bg-pink-100 text-pink-600',
    amber: 'bg-amber-100 text-amber-600', emerald: 'bg-emerald-100 text-emerald-600'
  };
  return (
    <button onClick={onClick} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all flex items-center gap-4 text-left w-full group">
      <div className={`w-14 h-14 ${themes[color]} rounded-xl flex items-center justify-center shrink-0`}>
        {icon ? icon : <span className="jp-font text-2xl font-bold">{char}</span>}
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={20} className="text-slate-400" />
      </div>
    </button>
  );
};

// --- QUIZ PAGE (Refactored for Session based) ---
const QuizPage = ({ type, data, title, colorClass, onBack }) => {
  // Config
  const QUESTIONS_PER_SESSION = 10;
  
  // State
  const [sessionState, setSessionState] = useState('playing'); // 'playing' | 'result'
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Settings State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(`app-cat-${type}`);
    const defaults = {}; 
    getCategoriesForType(type).forEach(c => defaults[c.key] = true);
    return saved ? JSON.parse(saved) : defaults;
  });
  const [mode, setMode] = useState(localStorage.getItem(`app-mode-${type}`) || 'j-r');
  const [audioEnabled, setAudioEnabled] = useState(JSON.parse(localStorage.getItem('app-audio') || 'true'));
  const [showSettings, setShowSettings] = useState(false);

  // Quiz Logic State
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Audio Ref
  const audioCtxRef = useRef(null);

  // --- EFFECTS ---
  useEffect(() => { localStorage.setItem(`app-cat-${type}`, JSON.stringify(categories)); }, [categories, type]);
  useEffect(() => { localStorage.setItem(`app-mode-${type}`, mode); }, [mode, type]);
  useEffect(() => { localStorage.setItem('app-audio', JSON.stringify(audioEnabled)); }, [audioEnabled]);
  
  useEffect(() => {
    const saved = parseInt(localStorage.getItem(`highscore-${type}`) || '0');
    setHighScore(saved);
  }, [type]);

  // --- AUDIO ---
  const initAudio = () => {
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
  };

  const playSound = (isCorrect) => {
    if (!audioEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    
    if (isCorrect) {
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    } else {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    }
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP'; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  // --- GAME LOGIC ---
  const generateQuestion = useCallback(() => {
    const activeCats = Object.keys(categories).filter(k => categories[k]);
    // Fallback if data is empty or filtering fails (demo safety)
    let pool = data.filter(d => activeCats.includes(d.type));
    if (pool.length < 4) pool = data; // Ensure enough data for options

    if (pool.length === 0) return; // Should not happen with fallback

    const q = pool[Math.floor(Math.random() * pool.length)];
    let opts = [q];
    while (opts.length < 4) {
      const r = pool[Math.floor(Math.random() * pool.length)];
      if (!opts.find(o => o.romaji === r.romaji)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setCurrentQuestion(q);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [categories, data]);

  // Initial Load
  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleNext = () => {
    if (questionCount >= QUESTIONS_PER_SESSION) {
      // End Session
      setSessionState('result');
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`highscore-${type}`, score);
      }
    } else {
      setQuestionCount(prev => prev + 1);
      generateQuestion();
    }
  };

  const handleRestart = () => {
    setScore(0);
    setWrong(0);
    setQuestionCount(1);
    setSessionState('playing');
    generateQuestion();
  };

  const handleAnswer = (opt) => {
    if (isAnswered) return;
    initAudio();
    setIsAnswered(true);
    setSelectedOption(opt);
    
    const isCorrect = opt.romaji === currentQuestion.romaji;
    if (navigator.vibrate) navigator.vibrate(isCorrect ? 50 : 200);
    playSound(isCorrect);

    if (isCorrect) setScore(s => s + 1);
    else setWrong(w => w + 1);
  };

  // Theme Colors
  const themes = {
    indigo: 'bg-indigo-600', pink: 'bg-pink-500', amber: 'bg-amber-500', emerald: 'bg-emerald-600',
    text: { indigo: 'text-indigo-600', pink: 'text-pink-600', amber: 'text-amber-600', emerald: 'text-emerald-600' }
  };
  const themeBg = themes[colorClass];
  const themeText = themes.text[colorClass];

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 bn-font">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden relative">
        
        {/* Header Background */}
        <div className={`${themeBg} h-32 w-full absolute top-0 left-0 z-0`}></div>

        {/* Top Bar */}
        <div className="relative z-10 flex justify-between items-center p-6 text-white">
          <button onClick={onBack} className="bg-white/20 p-2 rounded-lg hover:bg-white/30 backdrop-blur-sm"><ChevronLeft size={20}/></button>
          <div className="font-bold text-lg">{title}</div>
          <button onClick={() => setShowSettings(!showSettings)} className="bg-white/20 p-2 rounded-lg hover:bg-white/30 backdrop-blur-sm"><Settings size={20}/></button>
        </div>

        {/* SETTINGS MODAL */}
        {showSettings && (
          <div className="absolute top-20 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 animate-in slide-in-from-top-4">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-slate-700">সেটিংস</h3>
               <button onClick={() => setShowSettings(false)} className="text-slate-400"><X size={20}/></button>
             </div>
             <div className="space-y-4">
                <button onClick={() => setAudioEnabled(!audioEnabled)} className={`w-full flex items-center justify-between p-3 rounded-xl border ${audioEnabled ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600'}`}>
                  <span>সাউন্ড ইফেক্ট</span>
                  {audioEnabled ? <Volume2 size={18}/> : <VolumeX size={18}/>}
                </button>
                <div className="grid grid-cols-2 gap-2">
                   <button onClick={() => setMode('j-r')} className={`p-2 text-sm font-bold border rounded-lg ${mode==='j-r' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'text-slate-500'}`}>JP → BN</button>
                   <button onClick={() => setMode('r-j')} className={`p-2 text-sm font-bold border rounded-lg ${mode==='r-j' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'text-slate-500'}`}>BN → JP</button>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-slate-400 mb-2">ক্যাটাগরি</p>
                  <div className="flex flex-wrap gap-2">
                    {getCategoriesForType(type).map(cat => (
                      <button key={cat.key} onClick={() => setCategories(c => ({...c, [cat.key]: !c[cat.key]}))} 
                        className={`text-xs px-2 py-1 rounded border ${categories[cat.key] ? 'bg-slate-800 text-white' : 'bg-white text-slate-500'}`}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="relative z-10 bg-white rounded-t-3xl min-h-[400px] flex flex-col">
          
          {sessionState === 'playing' ? (
            <div className="p-6 flex flex-col h-full">
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
                <div className={`${themeBg} h-full transition-all duration-500`} style={{ width: `${(questionCount / QUESTIONS_PER_SESSION) * 100}%` }}></div>
              </div>
              
              <div className="flex justify-between text-slate-400 text-sm font-bold mb-8">
                <span>প্রশ্ন {questionCount}/{QUESTIONS_PER_SESSION}</span>
                <span className={`${themeText}`}>স্কোর: {score}</span>
              </div>

              {currentQuestion && (
                <>
                  <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
                     <button onClick={() => speak(currentQuestion.char)} className="absolute top-0 right-0 p-2 text-slate-400 hover:text-indigo-500"><Volume2 size={24}/></button>
                     <div className="text-center" onClick={() => speak(currentQuestion.char)}>
                        {mode === 'j-r' 
                          ? <span className="jp-font text-8xl font-bold text-slate-800">{currentQuestion.char}</span>
                          : <span className="font-bold text-4xl text-slate-800">{currentQuestion.romaji}</span>
                        }
                        <p className="text-slate-400 text-sm mt-2 font-medium bg-slate-100 px-3 py-1 rounded-full inline-block">
                          {categories[currentQuestion.type] ? currentQuestion.type : 'Mixed'}
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {options.map((opt, i) => {
                      let bgClass = "bg-white border-slate-200 text-slate-600 hover:border-indigo-300";
                      if (isAnswered) {
                         if (opt.romaji === currentQuestion.romaji) bgClass = "bg-green-500 border-green-600 text-white";
                         else if (selectedOption === opt) bgClass = "bg-red-500 border-red-600 text-white";
                         else bgClass = "bg-slate-50 border-slate-100 text-slate-300";
                      }
                      return (
                        <button key={i} onClick={() => handleAnswer(opt)} disabled={isAnswered}
                          className={`p-4 rounded-xl border-2 font-bold text-lg transition-all ${bgClass} shadow-sm active:scale-95`}>
                          {mode === 'j-r' ? opt.romaji : <span className="jp-font">{opt.char}</span>}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              <div className="h-14 flex items-center justify-center">
                 {isAnswered && (
                   <button onClick={handleNext} className={`${themeBg} text-white px-8 py-3 rounded-full font-bold shadow-lg w-full active:scale-95 transition-transform flex items-center justify-center gap-2`}>
                     {questionCount === QUESTIONS_PER_SESSION ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'} <ArrowRight size={18}/>
                   </button>
                 )}
              </div>
            </div>
          ) : (
            // RESULT SCREEN
            <div className="p-8 flex flex-col items-center justify-center h-full min-h-[450px] animate-in zoom-in duration-300">
               <div className="relative mb-6">
                 <Trophy size={80} className="text-yellow-400" />
                 <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                   {score === QUESTIONS_PER_SESSION ? 'পারফেক্ট!' : 'দারুণ!'}
                 </div>
               </div>
               
               <h2 className="text-3xl font-bold text-slate-800 mb-2">কুইজ শেষ!</h2>
               <p className="text-slate-500 mb-8">আপনি {QUESTIONS_PER_SESSION} টি প্রশ্নের উত্তর দিয়েছেন</p>

               <div className="w-full bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 grid grid-cols-2 gap-4">
                  <div className="text-center border-r border-slate-200">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">আপনার স্কোর</p>
                    <p className={`text-4xl font-bold ${themeText}`}>{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">ভুল উত্তর</p>
                    <p className="text-4xl font-bold text-red-400">{wrong}</p>
                  </div>
               </div>

               <div className="flex w-full gap-3">
                 <button onClick={onBack} className="flex-1 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-500 hover:bg-slate-50">হোম</button>
                 <button onClick={handleRestart} className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${themeBg} flex items-center justify-center gap-2 active:scale-95 transition-transform`}>
                   <RotateCcw size={18}/> আবার খেলুন
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
     
