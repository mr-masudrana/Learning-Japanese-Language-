```react
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Settings, 
  RefreshCw, 
  Check, 
  X, 
  Trophy, 
  ArrowRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  PenTool, 
  Sparkles, 
  Home, 
  BarChart3, 
  XCircle, 
  Star, 
  Zap, 
  Moon, 
  Sun,
  Search,
  GraduationCap
} from 'lucide-react';

// --- ডাটা সোর্স (সম্পূর্ণ ডাটা সেট রাখা হয়েছে) ---
const hiraganaData = [
  { char: 'あ', romaji: 'a', type: 'basic' }, { char: 'い', romaji: 'i', type: 'basic' }, { char: 'う', romaji: 'u', type: 'basic' }, { char: 'え', romaji: 'e', type: 'basic' }, { char: 'お', romaji: 'o', type: 'basic' },
  { char: 'か', romaji: 'ka', type: 'basic' }, { char: 'き', romaji: 'ki', type: 'basic' }, { char: 'く', romaji: 'ku', type: 'basic' }, { char: 'け', romaji: 'ke', type: 'basic' }, { char: 'こ', romaji: 'ko', type: 'basic' },
  { char: 'さ', romaji: 'sa', type: 'basic' }, { char: 'し', romaji: 'shi', type: 'basic' }, { char: 'す', romaji: 'su', type: 'basic' }, { char: 'せ', romaji: 'se', type: 'basic' }, { char: 'そ', romaji: 'so', type: 'basic' },
];

const katakanaData = [
  { char: 'ア', romaji: 'a', type: 'basic' }, { char: 'イ', romaji: 'i', type: 'basic' }, { char: 'ウ', romaji: 'u', type: 'basic' }, { char: 'エ', romaji: 'e', type: 'basic' }, { char: 'オ', romaji: 'o', type: 'basic' },
];

const kanjiData = [
  { char: '一', romaji: 'ichi', meaning: 'এক', type: 'numbers' }, { char: '二', romaji: 'ni', meaning: 'দুই', type: 'numbers' }, { char: '三', romaji: 'san', meaning: 'তিন', type: 'numbers' },
  { char: '四', romaji: 'yon', meaning: 'চার', type: 'numbers' }, { char: '五', romaji: 'go', meaning: 'পাঁচ', type: 'numbers' },
];

const vocabData = [
  { char: 'わたし', romaji: 'watashi', meaning: 'আমি', type: 'lesson01' },
  { char: 'あなた', romaji: 'anata', meaning: 'আপনি / তুমি', type: 'lesson01' },
  { char: 'あのひと', romaji: 'ano hito', meaning: 'ওই ব্যক্তি', type: 'lesson01' },
  { char: 'せんせい', romaji: 'sensei', meaning: 'শিক্ষক', type: 'lesson01' },
  { char: 'がくせい', romaji: 'gakusei', meaning: 'ছাত্র', type: 'lesson01' },
  { char: 'はい', romaji: 'hai', meaning: 'হ্যাঁ', type: 'lesson01' },
  { char: 'いいえ', romaji: 'iie', meaning: 'না', type: 'lesson01' },
  { char: 'これ', romaji: 'kore', meaning: 'এটি', type: 'lesson02' },
  { char: 'それ', romaji: 'sore', meaning: 'ওটি', type: 'lesson02' },
  { char: 'あれ', romaji: 'are', meaning: 'ওটা', type: 'lesson02' },
  { char: 'ほん', romaji: 'hon', meaning: 'বই', type: 'lesson02' },
  { char: 'じしょ', romaji: 'jisho', meaning: 'অভিধান', type: 'lesson02' },
  { char: 'ざっし', romaji: 'zasshi', meaning: 'ম্যাগাজিন', type: 'lesson02' },
  { char: 'しんぶん', romaji: 'shinbun', meaning: 'সংবাদপত্র', type: 'lesson02' },
  { char: 'ノート', romaji: 'nooto', meaning: 'নোটবুক', type: 'lesson02' },
  { char: 'かばん', romaji: 'kaban', meaning: 'ব্যাগ', type: 'lesson02' },
  { char: 'くるま', romaji: 'kuruma', meaning: 'গাড়ি', type: 'lesson02' },
  { char: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: 'শুভ সকাল', type: 'conversation' },
  { char: 'こんにちは', romaji: 'konnichiwa', meaning: 'হ্যালো / শুভ দুপুর', type: 'conversation' },
  { char: 'こんばんは', romaji: 'konbanwa', meaning: 'শুভ সন্ধ্যা', type: 'conversation' },
  { char: 'ありがとうございます', romaji: 'arigatou gozaimasu', meaning: 'ধন্যবাদ', type: 'conversation' },
];

const quizConfig = {
  hiragana: { data: hiraganaData, title: "হিরাগানা কুইজ", gradient: "from-indigo-600 to-violet-600", categories: [{ id: 'basic', label: 'বেসিক' }] },
  katakana: { data: katakanaData, title: "কাতাকানা কুইজ", gradient: "from-rose-500 to-pink-600", categories: [{ id: 'basic', label: 'বেসিক' }] },
  kanji: { data: kanjiData, title: "কান্জি N5 কুইজ", gradient: "from-amber-500 to-orange-600", categories: [{ id: 'numbers', label: 'সংখ্যা' }] },
  vocab: { data: vocabData, title: "ভোকাবুলারি কুইজ", gradient: "from-teal-500 to-emerald-600", categories: [{ id: 'lesson01', label: 'লেসন ১' }, { id: 'lesson02', label: 'লেসন ২' }, { id: 'conversation', label: 'কথোপকথন' }] }
};

// --- মেইন অ্যাপ ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [totalPoints, setTotalPoints] = useState(() => parseInt(localStorage.getItem('jp-pts') || '0'));
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('jp-lvl') || '1'));
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('jp-dm') || 'false'));

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('jp-dm', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const newLevel = Math.floor(totalPoints / 100) + 1;
    if (newLevel !== level) setLevel(newLevel);
    localStorage.setItem('jp-pts', totalPoints.toString());
    localStorage.setItem('jp-lvl', newLevel.toString());
  }, [totalPoints, level]);

  const handleCorrect = useCallback(() => setTotalPoints(p => p + 5), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-indigo-100 transition-colors duration-300 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .jp-font { font-family: 'Noto Sans JP', sans-serif; }
        .bn-font { font-family: 'Hind Siliguri', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .btn-press:active { transform: scale(0.96); }
      `}</style>

      {currentView === 'home' && <HomePage onSelect={setCurrentView} level={level} points={totalPoints} darkMode={darkMode} setDarkMode={setDarkMode} />}
      {currentView === 'study' && <StudyPage onBack={() => setCurrentView('home')} />}
      {Object.keys(quizConfig).includes(currentView) && (
        <QuizPage type={currentView} config={quizConfig[currentView]} onCorrect={handleCorrect} onBack={() => setCurrentView('home')} />
      )}
    </div>
  );
}

// --- হোম পেজ ---
const HomePage = ({ onSelect, level, points, darkMode, setDarkMode }) => {
  const progress = (points % 100);
  return (
    <div className="relative min-h-screen flex flex-col bn-font overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 dark:from-indigo-950 dark:via-slate-900 dark:to-black rounded-b-[40px] shadow-2xl z-0 transition-all duration-700"></div>
      
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-6 flex flex-col">
        <header className="flex justify-between items-center mb-6 text-white">
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-xl border border-white/10">
                <Sparkles size={20} className="text-yellow-300 fill-current" />
             </div>
             <h1 className="font-bold text-lg">জাপানি শিখি</h1>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 bg-white/20 rounded-full backdrop-blur-xl border border-white/10 btn-press">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <section className="mb-8">
          <div className="bg-white/10 backdrop-blur-3xl rounded-[30px] p-5 border border-white/10 shadow-2xl">
             <div className="flex justify-between items-center mb-3">
                <div className="text-white">
                   <p className="text-[10px] uppercase tracking-widest font-black opacity-60 mb-0.5">প্রগতি</p>
                   <h2 className="text-2xl font-black">লেভেল {level}</h2>
                </div>
                <div className="bg-yellow-400 text-indigo-900 px-3 py-1.5 rounded-xl font-black text-lg shadow-lg">
                   {points} <span className="text-[10px] uppercase">Pts</span>
                </div>
             </div>
             <div className="h-3 bg-black/20 rounded-full overflow-hidden p-0.5">
               <div className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${progress}%` }} />
             </div>
          </div>
        </section>

        <div className="space-y-5">
          <div>
            <h3 className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-4 mb-3">শেখার জন্য</h3>
            <HomeCard onClick={() => onSelect('study')} gradient="from-cyan-500 to-blue-600" icon={<GraduationCap size={24} />} title="শব্দভাণ্ডার শিখুন" desc="লেসন অনুযায়ী শব্দগুলো পড়ে নিন" isIconComp />
          </div>

          <div>
            <h3 className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-4 mb-3">কুইজ খেলুন</h3>
            <div className="grid grid-cols-1 gap-3">
              <HomeCard onClick={() => onSelect('hiragana')} gradient="from-indigo-500 to-blue-600" icon="あ" title="হিরাগানা" desc="বর্ণমালা যাচাই করুন" />
              <HomeCard onClick={() => onSelect('katakana')} gradient="from-rose-500 to-pink-600" icon="ア" title="কাতাকানা" desc="বিদেশি শব্দের কুইজ" />
              <HomeCard onClick={() => onSelect('kanji')} gradient="from-amber-500 to-orange-600" icon={<PenTool size={24} />} title="কান্জি N5" desc="চিহ্ন ও অর্থ কুইজ" isIconComp />
              <HomeCard onClick={() => onSelect('vocab')} gradient="from-teal-500 to-emerald-600" icon={<BookOpen size={24} />} title="ভোকাবুলারি কুইজ" desc="শব্দভাণ্ডার যাচাই করুন" isIconComp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeCard = ({ onClick, gradient, icon, title, desc, isIconComp }) => (
  <button onClick={onClick} className="group relative w-full flex items-center p-1 rounded-[25px] transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg dark:shadow-slate-950/40">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-[25px] opacity-100 transition-opacity`}></div>
    <div className="relative z-10 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-[20px] flex items-center p-3 border border-white/50 dark:border-white/5 transition-colors">
      <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md`}>
        {isIconComp ? icon : <span className="jp-font text-2xl font-black">{icon}</span>}
      </div>
      <div className="flex flex-col items-start text-left ml-3 flex-grow">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{desc}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
        <ArrowRight size={14} />
      </div>
    </div>
  </button>
);

// --- স্টাডি পেজ (পরিমার্জিত ডিজাইন) ---
const StudyPage = ({ onBack }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const categories = [
    { id: 'all', label: 'সব' },
    { id: 'lesson01', label: 'লেসন ১' },
    { id: 'lesson02', label: 'লেসন ২' },
    { id: 'conversation', label: 'কথোপকথন' }
  ];

  const filteredData = vocabData.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.char.includes(search) || item.romaji.toLowerCase().includes(search.toLowerCase()) || item.meaning.includes(search);
    return matchesFilter && matchesSearch;
  });

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 bn-font transition-colors duration-300 overflow-hidden">
      <header className="shrink-0 bg-gradient-to-br from-cyan-600 to-blue-800 p-5 rounded-b-[35px] shadow-xl z-20">
        <div className="max-w-md mx-auto flex items-center justify-between text-white mb-4">
           <button onClick={onBack} className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md btn-press border border-white/10"><ChevronLeft size={20} /></button>
           <h2 className="text-lg font-bold tracking-tight">শব্দভাণ্ডার শিখুন</h2>
           <div className="w-10"></div>
        </div>
        <div className="max-w-md mx-auto relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={16} />
           <input 
             type="text" 
             placeholder="খুঁজুন..." 
             className="w-full bg-white/20 border border-white/20 rounded-2xl py-3 pl-11 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ring-white/30 backdrop-blur-md transition-all text-sm shadow-inner"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </header>

      <div className="shrink-0 flex gap-2 overflow-x-auto px-6 py-4 no-scrollbar z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setFilter(cat.id)}
            className={`shrink-0 px-4 py-1.5 rounded-xl text-[11px] font-bold transition-all border shadow-sm ${filter === cat.id ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <main className="flex-grow overflow-y-auto px-6 pb-20 no-scrollbar">
        <div className="max-w-md mx-auto space-y-3 pt-2">
          {filteredData.length > 0 ? filteredData.map((item, idx) => (
            <div key={idx} className="relative bg-white dark:bg-slate-800 rounded-[25px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center p-5 group overflow-hidden">
               
               {/* জাপানি */}
               <div className="mb-2">
                  <span className="jp-font text-3xl font-black text-indigo-600 dark:text-indigo-400">{item.char}</span>
               </div>

               {/* বাংলা */}
               <div className="mb-1">
                  <h4 className="bn-font text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.meaning}</h4>
               </div>

               {/* রোমাজি */}
               <div>
                  <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-sans">{item.romaji}</p>
               </div>

               {/* সাউন্ড বাটন */}
               <button 
                 onClick={() => speak(item.char)} 
                 className="absolute top-3 right-3 p-2 bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-full hover:bg-indigo-600 hover:text-white transition-all btn-press shadow-sm"
               >
                 <Volume2 size={16} />
               </button>
               
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            </div>
          )) : (
            <div className="text-center py-20 text-slate-300 dark:text-slate-700 flex flex-col items-center">
               <XCircle size={48} className="mb-4 opacity-10" />
               <p className="font-black tracking-widest uppercase text-[10px]">কিছু পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- কুইজ পেজ (অপরিবর্তিত) ---
const QuizPage = ({ type, config, onBack, onCorrect }) => {
  const { data, title, gradient, categories: catConfig } = config;
  const [cats, setCats] = useState(() => {
    const d = {}; catConfig.forEach((c, i) => d[c.id] = i === 0); return d;
  });
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  const generate = useCallback(() => {
    const activeIds = Object.keys(cats).filter(k => cats[k]);
    const pool = data.filter(d => activeIds.includes(d.type));
    if (pool.length === 0) return;
    const q = pool[Math.floor(Math.random() * pool.length)];
    let opts = [q];
    while (opts.length < 4 && opts.length < pool.length) {
      const r = pool[Math.floor(Math.random() * pool.length)];
      if (!opts.find(o => o.romaji === r.romaji)) opts.push(r);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setCurrent(q); setAnswered(false); setSelected(null);
  }, [cats, data]);

  useEffect(() => { generate(); }, [generate]);

  const handleAns = (opt) => {
    if (answered) return;
    setAnswered(true); setSelected(opt);
    if (opt.romaji === current.romaji) {
       setScore(s => s + 1); onCorrect();
       const u = new SpeechSynthesisUtterance(current.char); u.lang = 'ja-JP'; window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-950 flex flex-col bn-font overflow-hidden">
      <div className={`absolute top-0 w-full h-[40vh] bg-gradient-to-br ${gradient} rounded-b-[50px] z-0 shadow-2xl`}></div>
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 text-white">
        <button onClick={onBack} className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xl btn-press border border-white/10"><ChevronLeft size={22} /></button>
        <div className="text-center">
           <h2 className="font-bold text-lg drop-shadow-md">{title}</h2>
           <div className="flex items-center justify-center gap-1 opacity-70">
              <Zap size={10} className="fill-current" />
              <span className="text-[9px] font-black uppercase tracking-widest">স্কোর: {score}</span>
           </div>
        </div>
        <div className="w-10"></div>
      </nav>

      <main className="relative z-10 flex-grow flex flex-col p-6 overflow-hidden">
        <div className="flex-grow bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-white/50 dark:border-white/5">
          <div className="flex-grow flex flex-col p-6 items-center justify-center overflow-y-auto no-scrollbar">
            {current && (
              <div className="w-full flex flex-col items-center">
                <div className="w-44 h-44 bg-slate-50 dark:bg-slate-700/30 rounded-[40px] flex items-center justify-center shadow-inner mb-8 border border-slate-100 dark:border-slate-700 transition-colors">
                   <span className={`jp-font ${current.char.length > 3 ? 'text-3xl' : 'text-6xl'} font-black text-slate-800 dark:text-slate-100`}>{current.char}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  {options.map((opt, i) => {
                    const isCorrect = opt.romaji === current.romaji;
                    const isSelected = selected === opt;
                    let style = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm";
                    if (answered) {
                      if (isCorrect) style = "bg-green-500 border-green-500 text-white shadow-lg";
                      else if (isSelected) style = "bg-red-500 border-red-500 text-white";
                      else style = "opacity-30 bg-slate-100 dark:bg-slate-900";
                    }
                    return (
                      <button key={i} onClick={() => handleAns(opt)} disabled={answered} className={`h-20 rounded-[25px] border-b-4 flex items-center justify-center font-bold btn-press transition-all duration-300 ${sty
