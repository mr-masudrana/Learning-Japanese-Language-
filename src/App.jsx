import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Settings, RefreshCw, Check, X, Trophy, ArrowRight, ChevronLeft, Volume2, VolumeX, BookOpen, PenTool, Sparkles, Home, BarChart3, XCircle, Star, Zap, Moon, Sun } from 'lucide-react';

// --- DATA SOURCES (অপরিবর্তিত) ---
const hiraganaData = [
  { char: 'あ', romaji: 'a', type: 'basic' }, { char: 'い', romaji: 'i', type: 'basic' }, { char: 'う', romaji: 'u', type: 'basic' }, { char: 'え', romaji: 'e', type: 'basic' }, { char: 'お', romaji: 'o', type: 'basic' },
  { char: 'か', romaji: 'ka', type: 'basic' }, { char: 'き', romaji: 'ki', type: 'basic' }, { char: 'く', romaji: 'ku', type: 'basic' }, { char: 'け', romaji: 'ke', type: 'basic' }, { char: 'こ', romaji: 'ko', type: 'basic' },
  { char: 'さ', romaji: 'sa', type: 'basic' }, { char: 'し', romaji: 'shi', type: 'basic' }, { char: 'す', romaji: 'su', type: 'basic' }, { char: 'せ', romaji: 'se', type: 'basic' }, { char: 'そ', romaji: 'so', type: 'basic' },
  { char: 'た', romaji: 'ta', type: 'basic' }, { char: 'ち', romaji: 'chi', type: 'basic' }, { char: 'つ', romaji: 'tsu', type: 'basic' }, { char: 'て', romaji: 'te', type: 'basic' }, { char: 'と', romaji: 'to', type: 'basic' },
  { char: 'な', romaji: 'na', type: 'basic' }, { char: 'に', romaji: 'ni', type: 'basic' }, { char: 'ぬ', romaji: 'nu', type: 'basic' }, { char: 'ね', romaji: 'ne', type: 'basic' }, { char: 'の', romaji: 'no', type: 'basic' },
  { char: 'は', romaji: 'ha', type: 'basic' }, { char: 'ひ', romaji: 'hi', type: 'basic' }, { char: 'ふ', romaji: 'fu', type: 'basic' }, { char: 'へ', romaji: 'he', type: 'basic' }, { char: 'ほ', romaji: 'ho', type: 'basic' },
  { char: 'ま', romaji: 'ma', type: 'basic' }, { char: 'み', romaji: 'mi', type: 'basic' }, { char: 'む', romaji: 'mu', type: 'basic' }, { char: 'め', romaji: 'me', type: 'basic' }, { char: 'も', romaji: 'mo', type: 'basic' },
  { char: 'や', romaji: 'ya', type: 'basic' }, { char: 'ゆ', romaji: 'yu', type: 'basic' }, { char: 'よ', romaji: 'yo', type: 'basic' },
  { char: 'ら', romaji: 'ra', type: 'basic' }, { char: 'り', romaji: 'ri', type: 'basic' }, { char: 'る', romaji: 'ru', type: 'basic' }, { char: 'れ', romaji: 're', type: 'basic' }, { char: 'ろ', romaji: 'ro', type: 'basic' },
  { char: 'わ', romaji: 'wa', type: 'basic' }, { char: 'を', romaji: 'wo', type: 'basic' }, { char: 'ん', romaji: 'n', type: 'basic' },
  { char: 'が', romaji: 'ga', type: 'dakuten' }, { char: 'ぎ', romaji: 'gi', type: 'dakuten' }, { char: 'ぐ', romaji: 'gu', type: 'dakuten' }, { char: 'げ', romaji: 'ge', type: 'dakuten' }, { char: 'ご', romaji: 'go', type: 'dakuten' },
  { char: 'ざ', romaji: 'za', type: 'dakuten' }, { char: 'じ', romaji: 'ji', type: 'dakuten' }, { char: 'ず', romaji: 'zu', type: 'dakuten' }, { char: 'ぜ', romaji: 'ze', type: 'dakuten' }, { char: 'ぞ', romaji: 'zo', type: 'dakuten' },
  { char: 'だ', romaji: 'da', type: 'dakuten' }, { char: 'ぢ', romaji: 'ji', type: 'dakuten' }, { char: 'づ', romaji: 'zu', type: 'dakuten' }, { char: 'で', romaji: 'de', type: 'dakuten' }, { char: 'ど', romaji: 'do', type: 'dakuten' },
  { char: 'ば', romaji: 'ba', type: 'dakuten' }, { char: 'び', romaji: 'bi', type: 'dakuten' }, { char: 'ぶ', romaji: 'bu', type: 'dakuten' }, { char: 'べ', romaji: 'be', type: 'dakuten' }, { char: 'ぼ', romaji: 'bo', type: 'dakuten' },
  { char: 'ぱ', romaji: 'pa', type: 'dakuten' }, { char: 'ぴ', romaji: 'pi', type: 'dakuten' }, { char: 'ぷ', romaji: 'pu', type: 'dakuten' }, { char: 'ぺ', romaji: 'pe', type: 'dakuten' }, { char: 'ぽ', romaji: 'po', type: 'dakuten' },
  { char: 'きゃ', romaji: 'kya', type: 'combo' }, { char: 'きゅ', romaji: 'kyu', type: 'combo' }, { char: 'きょ', romaji: 'kyo', type: 'combo' },
  { char: 'しゃ', romaji: 'sha', type: 'combo' }, { char: 'しゅ', romaji: 'shu', type: 'combo' }, { char: 'しょ', romaji: 'sho', type: 'combo' },
  { char: 'ちゃ', romaji: 'cha', type: 'combo' }, { char: 'ちゅ', romaji: 'chu', type: 'combo' }, { char: 'ちょ', romaji: 'cho', type: 'combo' },
];

const katakanaData = [
  { char: 'ア', romaji: 'a', type: 'basic' }, { char: 'イ', romaji: 'i', type: 'basic' }, { char: 'ウ', romaji: 'u', type: 'basic' }, { char: 'エ', romaji: 'e', type: 'basic' }, { char: 'オ', romaji: 'o', type: 'basic' },
  { char: 'カ', romaji: 'ka', type: 'basic' }, { char: 'キ', romaji: 'ki', type: 'basic' }, { char: 'ク', romaji: 'ku', type: 'basic' }, { char: 'ケ', romaji: 'ke', type: 'basic' }, { char: 'コ', romaji: 'ko', type: 'basic' },
  { char: 'サ', romaji: 'sa', type: 'basic' }, { char: 'シ', romaji: 'shi', type: 'basic' }, { char: 'ス', romaji: 'su', type: 'basic' }, { char: 'セ', romaji: 'se', type: 'basic' }, { char: 'ソ', romaji: 'so', type: 'basic' },
  { char: 'タ', romaji: 'ta', type: 'basic' }, { char: 'チ', romaji: 'chi', type: 'basic' }, { char: 'ツ', romaji: 'tsu', type: 'basic' }, { char: 'テ', romaji: 'te', type: 'basic' }, { char: 'ト', romaji: 'to', type: 'basic' },
  { char: 'ナ', romaji: 'na', type: 'basic' }, { char: 'ニ', romaji: 'ni', type: 'basic' }, { char: 'ヌ', romaji: 'nu', type: 'basic' }, { char: 'ネ', romaji: 'ne', type: 'basic' }, { char: 'ノ', romaji: 'no', type: 'basic' },
  { char: 'ハ', romaji: 'ha', type: 'basic' }, { char: 'ヒ', romaji: 'hi', type: 'basic' }, { char: 'フ', romaji: 'fu', type: 'basic' }, { char: 'ヘ', romaji: 'he', type: 'basic' }, { char: 'ホ', romaji: 'ho', type: 'basic' },
  { char: 'マ', romaji: 'ma', type: 'basic' }, { char: 'ミ', romaji: 'mi', type: 'basic' }, { char: 'ム', romaji: 'mu', type: 'basic' }, { char: 'メ', romaji: 'me', type: 'basic' }, { char: 'モ', romaji: 'mo', type: 'basic' },
  { char: 'ヤ', romaji: 'ya', type: 'basic' }, { char: 'ユ', romaji: 'yu', type: 'basic' }, { char: 'ヨ', romaji: 'yo', type: 'basic' },
  { char: 'ラ', romaji: 'ra', type: 'basic' }, { char: 'リ', romaji: 'ri', type: 'basic' }, { char: 'ル', romaji: 'ru', type: 'basic' }, { char: 'レ', romaji: 're', type: 'basic' }, { char: 'ロ', romaji: 'ro', type: 'basic' },
  { char: 'ワ', romaji: 'wa', type: 'basic' }, { char: 'ヲ', romaji: 'wo', type: 'basic' }, { char: 'ン', romaji: 'n', type: 'basic' },
  { char: 'ガ', romaji: 'ga', type: 'dakuten' }, { char: 'ギ', romaji: 'gi', type: 'dakuten' }, { char: 'グ', romaji: 'gu', type: 'dakuten' }, { char: 'ゲ', romaji: 'ge', type: 'dakuten' }, { char: 'ゴ', romaji: 'go', type: 'dakuten' },
  { char: 'ザ', romaji: 'za', type: 'dakuten' }, { char: 'ジ', romaji: 'ji', type: 'dakuten' }, { char: 'ズ', romaji: 'zu', type: 'dakuten' }, { char: 'ゼ', romaji: 'ze', type: 'dakuten' }, { char: 'ゾ', romaji: 'zo', type: 'dakuten' },
  { char: 'ダ', romaji: 'da', type: 'dakuten' }, { char: 'ヂ', romaji: 'ji', type: 'dakuten' }, { char: 'ヅ', romaji: 'zu', type: 'dakuten' }, { char: 'デ', romaji: 'de', type: 'dakuten' }, { char: 'ド', romaji: 'do', type: 'dakuten' },
  { char: 'バ', romaji: 'ba', type: 'dakuten' }, { char: 'ビ', romaji: 'bi', type: 'dakuten' }, { char: 'ブ', romaji: 'bu', type: 'dakuten' }, { char: 'ベ', romaji: 'be', type: 'dakuten' }, { char: 'ボ', romaji: 'bo', type: 'dakuten' },
  { char: 'パ', romaji: 'pa', type: 'dakuten' }, { char: 'ピ', romaji: 'pi', type: 'dakuten' }, { char: 'プ', romaji: 'pu', type: 'dakuten' }, { char: 'ペ', romaji: 'pe', type: 'dakuten' }, { char: 'ポ', romaji: 'po', type: 'dakuten' },
];

const kanjiData = [
  { char: '一', romaji: 'ichi', meaning: 'এক', type: 'numbers' }, { char: '二', romaji: 'ni', meaning: 'দুই', type: 'numbers' }, { char: '三', romaji: 'san', meaning: 'তিন', type: 'numbers' },
  { char: '四', romaji: 'yon', meaning: 'চার', type: 'numbers' }, { char: '五', romaji: 'go', meaning: 'পাঁচ', type: 'numbers' }, { char: '六', romaji: 'roku', meaning: 'ছয়', type: 'numbers' },
  { char: '七', romaji: 'nana', meaning: 'সাত', type: 'numbers' }, { char: '八', romaji: 'hachi', meaning: 'আট', type: 'numbers' }, { char: '九', romaji: 'kyuu', meaning: 'নয়', type: 'numbers' },
  { char: '十', romaji: 'juu', meaning: 'দশ', type: 'numbers' }, { char: '百', romaji: 'hyaku', meaning: 'শত', type: 'numbers' },
  { char: '日', romaji: 'nichi', meaning: 'দিন/সূর্য', type: 'nature' }, { char: '月', romaji: 'tsuki', meaning: 'চাঁদ/মাস', type: 'nature' }, { char: '火', romaji: 'hi', meaning: 'আগুন', type: 'nature' },
  { char: '水', romaji: 'mizu', meaning: 'জল', type: 'nature' }, { char: '木', romaji: 'ki', meaning: 'গাছ', type: 'nature' }, { char: '金', romaji: 'kane', meaning: 'টাকা/সোনা', type: 'nature' },
  { char: '土', romaji: 'tsuchi', meaning: 'মাটি', type: 'nature' }, { char: '山', romaji: 'yama', meaning: 'পাহাড়', type: 'nature' }, { char: '川', romaji: 'kawa', meaning: 'নদী', type: 'nature' },
  { char: '人', romaji: 'hito', meaning: 'মানুষ', type: 'person' }, { char: '子', romaji: 'ko', meaning: 'শিশু', type: 'person' }, { char: '女', romaji: 'onna', meaning: 'নারী', type: 'person' },
  { char: '男', romaji: 'otoko', meaning: 'পুরুষ', type: 'person' }, { char: '目', romaji: 'me', meaning: 'চোখ', type: 'person' }, { char: '口', romaji: 'kuchi', meaning: 'মুখ', type: 'person' },
];

const vocabData = [
  { char: 'おはよう', romaji: 'ohayou', meaning: 'সুপ্রভাত', type: 'greetings' }, { char: 'こんにちは', romaji: 'konnichiwa', meaning: 'হ্যালো', type: 'greetings' },
  { char: 'こんばんは', romaji: 'konbanwa', meaning: 'শুভ সন্ধ্যা', type: 'greetings' }, { char: 'さようなら', romaji: 'sayounara', meaning: 'বিদায়', type: 'greetings' },
  { char: 'ありがとう', romaji: 'arigatou', meaning: 'ধন্যবাদ', type: 'greetings' }, { char: 'すみません', romaji: 'sumimasen', meaning: 'মাফ করবেন', type: 'greetings' },
  { char: 'ねこ', romaji: 'neko', meaning: 'বিড়াল', type: 'daily' }, { char: 'いぬ', romaji: 'inu', meaning: 'কুকুর', type: 'daily' },
  { char: 'ほん', romaji: 'hon', meaning: 'বই', type: 'daily' }, { char: 'えんぴつ', romaji: 'enpitsu', meaning: 'পেন্সিল', type: 'daily' },
  { char: 'くるま', romaji: 'kuruma', meaning: 'গাড়ি', type: 'daily' }, { char: 'いえ', romaji: 'ie', meaning: 'বাড়ি', type: 'daily' },
  { char: 'がっこう', romaji: 'gakkou', meaning: 'স্কুল', type: 'daily' }, { char: 'せんせい', romaji: 'sensei', meaning: 'শিক্ষক', type: 'daily' },
];

// --- STATIC CONFIGURATION (Moved outside App to prevent re-renders) ---
const quizConfig = {
  hiragana: {
    data: hiraganaData,
    title: "হিরাগানা",
    color: "indigo",
    gradient: "from-indigo-600 to-violet-600",
    darkGradient: "dark:from-indigo-800 dark:to-violet-900",
    accent: "text-indigo-600 dark:text-indigo-400",
    categories: [{ id: 'basic', label: 'বেসিক' }, { id: 'dakuten', label: 'টেনটেন' }, { id: 'combo', label: 'যুক্তবর্ণ' }]
  },
  katakana: {
    data: katakanaData,
    title: "কাতাকানা",
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    darkGradient: "dark:from-rose-800 dark:to-pink-900",
    accent: "text-rose-600 dark:text-rose-400",
    categories: [{ id: 'basic', label: 'বেসিক' }, { id: 'dakuten', label: 'টেনটেন' }, { id: 'combo', label: 'যুক্তবর্ণ' }]
  },
  kanji: {
    data: kanjiData,
    title: "কান্জি N5",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    darkGradient: "dark:from-amber-800 dark:to-orange-900",
    accent: "text-amber-600 dark:text-amber-400",
    categories: [{ id: 'numbers', label: 'সংখ্যা' }, { id: 'nature', label: 'প্রকৃতি' }, { id: 'person', label: 'ব্যক্তি' }]
  },
  vocab: {
    data: vocabData,
    title: "ভোকাবুলারি",
    color: "teal",
    gradient: "from-teal-500 to-emerald-600",
    darkGradient: "dark:from-teal-800 dark:to-emerald-900",
    accent: "text-teal-600 dark:text-teal-400",
    categories: [{ id: 'greetings', label: 'শুভেচ্ছা' }, { id: 'daily', label: 'দৈনন্দিন' }]
  }
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');

  // --- GLOBAL STATE FOR POINTS, LEVEL & DARK MODE ---
  const [totalPoints, setTotalPoints] = useState(() => parseInt(localStorage.getItem('app-points') || '0'));
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('app-level') || '1'));
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('app-darkmode') || 'false'));

  // Handle Dark Mode Class
  useEffect(() => {
    localStorage.setItem('app-darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Level Up Logic
  useEffect(() => {
    const newLevel = Math.floor(totalPoints / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
    localStorage.setItem('app-points', totalPoints.toString());
    localStorage.setItem('app-level', newLevel.toString());
  }, [totalPoints, level]);

  const handleCorrectAnswer = useCallback(() => {
    setTotalPoints(prev => prev + 1);
  }, []);

  // Browser Back Button Logic
  useEffect(() => {
    if (currentView !== 'home') {
      window.history.pushState({ view: currentView }, '');
    }
    const handlePopState = (event) => {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-700 transition-colors duration-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .jp-font { font-family: 'Noto Sans JP', sans-serif; }
        .bn-font { font-family: 'Hind Siliguri', sans-serif; }
        .btn-press:active { transform: scale(0.95); }
        .h-dvh { height: 100vh; height: 100dvh; }
        /* Custom Scrollbar for dark mode */
        .dark ::-webkit-scrollbar-track { background: #1e293b; }
        .dark ::-webkit-scrollbar-thumb { background: #475569; }
      `}</style>

      {currentView === 'home' && (
        <HomePage 
          onSelect={setCurrentView} 
          level={level} 
          points={totalPoints} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}

      {currentView !== 'home' && (
        <QuizPage 
          type={currentView}
          config={quizConfig[currentView]}
          onCorrectAnswer={handleCorrectAnswer}
          onBack={() => {
            if(window.history.state) window.history.back(); 
            else setCurrentView('home');
          }} 
        />
      )}
    </div>
  );
}

// --- HOME NAVBAR ---
const HomeNavbar = ({ level, points, darkMode, setDarkMode }) => {
  return (
    <div className="w-full px-6 py-4 flex items-center justify-between bg-transparent relative z-20">
      <div className="flex items-center gap-2">
        <div className="bg-white/20 dark:bg-slate-800/30 p-2 rounded-xl backdrop-blur-md border border-white/10 dark:border-white/5">
          <Sparkles size={20} className="text-yellow-300" />
        </div>
        <h1 className="text-white font-bold text-lg hidden sm:block drop-shadow-sm">জাপানি শিখি</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-full border border-white/10 dark:border-white/5 p-1 pr-4 gap-3 shadow-sm">
          <div className="flex items-center gap-1.5 bg-indigo-500/80 dark:bg-indigo-600/80 text-white px-3 py-1.5 rounded-full font-bold text-sm">
            <Star size={14} className="fill-current" />
            <span>লেভেল {level}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/90 font-bold text-sm">
             <Zap size={14} className="text-yellow-300 fill-current" />
             <span>{points} পয়েন্ট</span>
          </div>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2.5 bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-full border border-white/10 dark:border-white/5 text-white hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all btn-press"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};


// --- HOME PAGE ---
const HomePage = ({ onSelect, level, points, darkMode, setDarkMode }) => {
  const nextLevelPoints = level * 100;
  const progress = (points % 100);

  return (
    <div className="relative min-h-dvh bg-slate-50 dark:bg-slate-950 bn-font flex flex-col transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900 rounded-b-[40px] shadow-2xl shadow-indigo-200/20 dark:shadow-none z-0 transition-colors duration-300"></div>
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-48 h-48 bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>

      <div className="absolute top-0 left-0 w-full z-30">
          <HomeNavbar level={level} points={points} darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <div className="relative z-10 flex flex-col flex-grow px-6 pt-24 pb-6 w-full max-w-5xl mx-auto">
        <div className="text-center mb-8 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-sm">
            জাপানি ভাষা <br className="md:hidden"/> শিখুন
          </h1>
          
          <div className="w-full max-w-md mx-auto bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 dark:border-white/5 shadow-lg">
             <div className="flex justify-between text-white text-sm font-bold mb-2">
               <span>পরের লেভেল: {nextLevelPoints} পয়েন্ট</span>
               <span>{progress}/100</span>
             </div>
             <div className="h-3 bg-black/20 dark:bg-black/40 rounded-full overflow-hidden font-sans">
               <div 
                 className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-1000 ease-out relative"
                 style={{ width: `${progress}%` }}
               >
                 <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
               </div>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <HomeCard 
              onClick={() => onSelect('hiragana')}
              gradient="from-indigo-500 to-blue-600"
              darkGradient="dark:from-indigo-700 dark:to-blue-800"
              icon="あ"
              title="হিরাগানা"
              desc="বেসিক জাপানি বর্ণমালা"
              delay="0"
            />
            <HomeCard 
              onClick={() => onSelect('katakana')}
              gradient="from-rose-500 to-pink-600"
              darkGradient="dark:from-rose-700 dark:to-pink-800"
              icon="ア"
              title="কাতাকানা"
              desc="বিদেশি শব্দের জন্য"
              delay="100"
            />
            <HomeCard 
              onClick={() => onSelect('kanji')}
              gradient="from-amber-500 to-orange-600"
              darkGradient="dark:from-amber-700 dark:to-orange-800"
              icon={<PenTool size={28} />}
              title="কান্জি N5"
              desc="প্রতীক ও তাদের অর্থ"
              isIconComponent={true}
              delay="200"
            />
            <HomeCard 
              onClick={() => onSelect('vocab')}
              gradient="from-teal-500 to-emerald-600"
              darkGradient="dark:from-teal-700 dark:to-emerald-800"
              icon={<BookOpen size={28} />}
              title="ভোকাবুলারি"
              desc="দৈনন্দিন শব্দভাণ্ডার"
              isIconComponent={true}
              delay="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Card Component
const HomeCard = ({ onClick, gradient, darkGradient, icon, title, desc, isIconComponent = false, delay }) => {
  return (
    <button 
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className="group relative w-full flex items-center p-1 rounded-2xl transition-all duration-300 active:scale-[0.98] animate-in slide-in-from-bottom-4 fade-in fill-mode-backwards shadow-lg hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-slate-900/80"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${darkGradient} rounded-2xl opacity-100 transition-colors duration-300`}></div>
      <div className="relative z-10 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-[14px] flex items-center p-4 overflow-hidden border border-white/50 dark:border-white/10 transition-colors duration-300">
        <div className="absolute -right-4 -bottom-4 text-slate-100/50 dark:text-slate-700/30 transform rotate-12 transition-colors duration-300">
           {isIconComponent ? <div className="opacity-20 scale-[2.5]">{icon}</div> : <span className="text-8xl font-black opacity-20 select-none jp-font">{icon}</span>}
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} ${darkGradient} flex items-center justify-center text-white shadow-md dark:shadow-slate-900/30 transition-colors duration-300`}>
            {isIconComponent ? icon : <span className="jp-font text-2xl font-black">{icon}</span>}
          </div>
          <div className="flex flex-col items-start text-left flex-grow">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">{title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">{desc}</p>
          </div>
          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center transition-colors duration-300">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </button>
  );
};


// --- QUIZ PAGE (FIXED: NO AUTO ADVANCE) ---
const QuizPage = ({ type, config, onBack, onCorrectAnswer }) => {
  const { data, title, gradient, darkGradient, categories: catConfig } = config;

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(`app-categories-${type}`);
    if (saved) return JSON.parse(saved);
    const defaults = {};
    catConfig.forEach((c, idx) => defaults[c.id] = idx === 0);
    return defaults;
  });

  const [mode, setMode] = useState(() => localStorage.getItem('app-mode') || 'j-r');
  const [audioEnabled, setAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('app-audio');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => { localStorage.setItem(`app-categories-${type}`, JSON.stringify(categories)); }, [categories, type]);
  useEffect(() => { localStorage.setItem('app-mode', mode); }, [mode]);
  useEffect(() => { localStorage.setItem('app-audio', JSON.stringify(audioEnabled)); }, [audioEnabled]);

  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const audioCtxRef = useRef(null);
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
  };

  const playSound = (soundType) => {
    if (!audioEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (soundType === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const saved = localStorage.getItem(`highscore-${type}`);
    if (saved) setHighScore(parseInt(saved, 10));
    setScore(0);
    setWrong(0);
    setIsAnswered(false);
  }, [type]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(`highscore-${type}`, score);
    }
  }, [score, highScore, type]);

  const generateQuestion = useCallback(() => {
    const activeCategoryIds = Object.keys(categories).filter(k => categories[k]);
    const keysToUse = activeCategoryIds.length > 0 ? activeCategoryIds : catConfig.map(c => c.id);
    const pool = data.filter(d => keysToUse.includes(d.type));

    if (pool.length === 0) {
      setCurrentQuestion(null);
      return;
    }
    const question = pool[Math.floor(Math.random() * pool.length)];
    let newOptions = [question];
    while (newOptions.length < 4 && newOptions.length < pool.length) {
      const randomOpt = pool[Math.floor(Math.random() * pool.length)];
      if (!newOptions.find(o => o.romaji === randomOpt.romaji)) {
        newOptions.push(randomOpt);
      }
    }
    newOptions.sort(() => Math.random() - 0.5);
    setCurrentQuestion(question);
    setOptions(newOptions);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [categories, data, catConfig]);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const handleCategoryChange = (key) => {
    setCategories(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (!Object.values(newState).some(v => v)) return prev;
      return newState;
    });
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;
    initAudio();
    setIsAnswered(true);
    setSelectedOption(option);
    const isCorrect = option.romaji === currentQuestion.romaji;
    if (navigator.vibrate) navigator.vibrate(isCorrect ? 50 : 200);
    
    if (isCorrect) { 
      playSound('correct'); 
      setScore(s => s + 1);
      // Update global points - now safe because quizConfig is static
      onCorrectAnswer();
    } else { 
      playSound('wrong'); 
      setWrong(w => w + 1); 
    }
  };

  const getMainFontSize = () => {
    if (mode === 'j-r') {
      if (type === 'vocab') return currentQuestion.char.length > 4 ? 'text-3xl sm:text-4xl' : 'text-5xl';
      return currentQuestion.type === 'combo' ? 'text-5xl sm:text-6xl' : 'text-7xl sm:text-8xl';
    } else {
      const text = currentQuestion.meaning || currentQuestion.romaji;
      return text.length > 6 ? 'text-2xl sm:text-3xl' : text.length > 2 ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl';
    }
  };

  const getOptionText = (opt) => {
    if (mode === 'j-r') {
      if (type === 'kanji' || type === 'vocab') return <span className="bn-font text-sm sm:text-base">{opt.meaning}</span>;
      return <span className="font-sans font-semibold tracking-wide text-sm sm:text-base">{opt.romaji}</span>;
    } 
    return <span className="jp-font text-xl sm:text-2xl font-bold">{opt.char}</span>;
  };
  
  return (
    <div className="fixed inset-0 h-dvh bg-slate-100 dark:bg-slate-900 flex flex-col bn-font overflow-hidden transition-colors duration-300">
      
      {/* BACKGROUND Header */}
      <div className={`absolute top-0 left-0 w-full h-[35vh] bg-gradient-to-br ${gradient} ${darkGradient} rounded-b-[30px] shadow-2xl dark:shadow-none z-0 transition-colors duration-300`}></div>

      {/* --- NAVBAR --- */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 text-white">
        <button onClick={onBack} className="p-2 bg-white/20 hover:bg-white/30 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 backdrop-blur-md rounded-xl transition-all btn-press border border-white/10">
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
           <h1 className="text-lg font-bold tracking-wide drop-shadow-md">{title}</h1>
           <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-90 bg-black/10 dark:bg-black/30 px-2 py-0.5 rounded-full">
             <Trophy size={10} className="text-yellow-300" /> TOP: {level}
           </div>
        </div>

        <button onClick={() => setShowSettings(true)} className="p-2 bg-white/20 hover:bg-white/30 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 backdrop-blur-md rounded-xl transition-all btn-press border border-white/10">
          <Settings size={22} />
        </button>
      </div>

      {/* --- SETTINGS POPUP MODAL --- */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl dark:shadow-slate-950/50 scale-100 animate-in zoom-in-95 duration-200 relative border border-white/10 transition-colors duration-300">
             <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
               <XCircle size={24} />
             </button>
             
             <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">সেটিংস</h2>
             
             <div className="space-y-6">
               <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-3">শব্দ</h4>
                  <button onClick={() => { setAudioEnabled(!audioEnabled); initAudio(); }} className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${audioEnabled ? `bg-slate-800 dark:bg-indigo-600 text-white` : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'}`}>
                    {audioEnabled ? <Volume2 size={18}/> : <VolumeX size={18}/>} সাউন্ড {audioEnabled ? 'অন' : 'অফ'}
                  </button>
               </div>
               
               <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-3">ভাষা মোড</h4>
                  <div className="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-xl transition-colors duration-300">
                    <button onClick={() => setMode('j-r')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'j-r' ? 'bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}>JP &rarr; BN</button>
                    <button onClick={() => setMode('r-j')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'r-j' ? 'bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}>BN &rarr; JP</button>
                  </div>
               </div>

               <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-3">ক্যাটাগরি</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {catConfig.map(c => (
                      <button key={c.id} onClick={() => handleCategoryChange(c.id)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${categories[c.id] ? `bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800` : 'bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-400 border-slate-200 dark:border-slate-600'}`}>
                        {c.label}
                      </button>
                    ))}
                  </div>
               </div>
             </div>
             
             <button onClick={() => setShowSettings(false)} className={`w-full mt-8 bg-gradient-to-r ${gradient} ${darkGradient} text-white py-3 rounded-xl font-bold btn-press shadow-lg transition-all duration-300`}>
               ঠিক আছে
             </button>
          </div>
        </div>
      )}

      {/* --- GAME BOARD CONTAINER --- */}
      <div className="relative z-10 flex flex-col flex-grow px-4 pb-4 mt-2 h-full overflow-hidden">
        <div className="flex-grow bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-slate-950/50 flex flex-col overflow-hidden transition-colors duration-300 border border-white/50 dark:border-white/5">
            
            {/* Stats Header */}
            <div className="shrink-0 flex justify-between items-center px-6 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 transition-colors duration-300">
              <div className="flex items-center gap-2">
                 <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xs shadow-sm">{score}</div>
                 <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">সঠিক</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ভুল</span>
                 <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400 flex items-center justify-center font-bold text-xs shadow-sm">{wrong}</div>
              </div>
            </div>

            {/* Quiz Content Area */}
            {!currentQuestion ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <BarChart3 size={40} className="text-slate-200 dark:text-slate-600 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">কোনো প্রশ্ন নেই।<br/>সেটিংস থেকে ক্যাটাগরি চেক করুন।</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col p-4 overflow-y-auto">
                
                {/* QUESTION CARD */}
                <div className="flex-1 flex items-center justify-center min-h-[160px]">
                  <div 
                     onClick={() => speak(currentQuestion.char)} 
                     className="relative w-full max-w-[240px] aspect-square group cursor-pointer"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${darkGradient} rounded-[2rem] blur-xl opacity-20 transition-all duration-300`}></div>
                    
                    <div className="relative w-full h-full bg-white dark:bg-slate-700 rounded-[2rem] border border-slate-100 dark:border-slate-600 shadow-xl dark:shadow-slate-900/50 flex flex-col items-center justify-center active:scale-95 transition-all duration-200">
                      <button className="absolute top-3 right-3 p-2 bg-slate-50 dark:bg-slate-600 text-slate-400 dark:text-slate-300 rounded-full hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <Volume2 size={18} />
                      </button>
                      <div className={`${mode === 'j-r' ? 'jp-font' : 'bn-font'} ${getMainFontSize()} font-black text-slate-800 dark:text-slate-100 text-center leading-tight transition-colors duration-300`}>
                          {mode === 'j-r' ? currentQuestion.char : (type === 'kanji' || type === 'vocab' ? currentQuestion.meaning : currentQuestion.romaji)}
                      </div>
                       <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${mode === 'j-r' && (type === 'kanji' || type === 'vocab') ? 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300' : 'invisible'}`}>
                        {currentQuestion.romaji}
                     </div>
                    </div>
                  </div>
                </div>

                {/* OPTIONS GRID */}
                <div className="shrink-0 grid grid-cols-2 gap-3 mt-4">
                  {options.map((opt, idx) => {
                    const isCorrect = opt.romaji === currentQuestion.romaji;
                    const isSelected = selectedOption === opt;
                    let stateClass = "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 shadow-sm"; 
                    
                    if (isAnswered) {
                      if (isCorrect) stateClass = "bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600 text-white shadow-md ring-1 ring-green-300 dark:ring-green-800";
                      else if (isSelected) stateClass = "bg-red-500 dark:bg-red-600 border-red-500 dark:border-red-600 text-white shadow-md opacity-80";
                      else stateClass = "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-500 opacity-50";
                    }

                    return (
                      <button 
                        key={idx} 
                        onClick={() => handleAnswer(opt)} 
                        disabled={isAnswered}
                        className={`relative w-full p-2 rounded-xl border-b-4 text-center transition-all btn-press flex flex-col items-center justify-center h-20 sm:h-24 ${stateClass}`}
                      >
                        {getOptionText(opt)}
                      </button>
                    )
                  })}
                </div>

                {/* NEXT BUTTON */}
                {isAnswered && (
                  <div className="absolute bottom-4 left-0 w-full px-4 z-20 animate-in slide-in-from-bottom-2 fade-in">
                    <button 
                      onClick={generateQuestion} 
                      className={`w-full py-3 rounded-xl bg-gradient-to-r ${gradient} ${darkGradient} text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all duration-300`}
                    >
                      পরের প্রশ্ন <ArrowRight size={20} />
                    </button>
                  </div>
                )}
                
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
