// src/pages/HomePage.js
import React from 'react';
import { ArrowRight, BookOpen, Type, Book, MessageCircle } from 'lucide-react';

const QuizCard = ({ title, sub, icon: Icon, char, color, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50 overflow-hidden text-left sm:text-center w-full"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <span className="text-8xl sm:text-9xl font-bold">{char}</span>
    </div>
    <div className="relative z-10 flex flex-col items-start sm:items-center">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${color.bg} ${color.text} rounded-2xl flex items-center justify-center mb-4 ${color.hoverBg} ${color.hoverText} transition-colors`}>
        <Icon size={32} />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{title}</h2>
      <p className="text-sm text-slate-500 mb-4">{sub}</p>
      <span className={`flex items-center ${color.text} font-bold group-hover:gap-2 transition-all`}>
        শুরু করুন <ArrowRight size={18} className="ml-1" />
      </span>
    </div>
  </button>
);

export default function HomePage({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bn-font">
      <div className="text-center mb-10 animate-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">জাপানি ভাষা শিখুন</h1>
        <p className="text-slate-500">আপনার শেখার যাত্রা শুরু করতে একটি ক্যাটাগরি বেছে নিন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl">
        <QuizCard 
          title="হিরাগানা" sub="বেসিক বর্ণমালা" char="あ" icon={Type}
          color={{ bg: 'bg-indigo-100', text: 'text-indigo-600', hoverBg: 'group-hover:bg-indigo-600', hoverText: 'group-hover:text-white' }}
          onClick={() => onSelect('hiragana')}
        />
        <QuizCard 
          title="কাতাকানা" sub="বিদেশি শব্দ" char="ア" icon={Type}
          color={{ bg: 'bg-pink-100', text: 'text-pink-600', hoverBg: 'group-hover:bg-pink-500', hoverText: 'group-hover:text-white' }}
          onClick={() => onSelect('katakana')}
        />
        <QuizCard 
          title="কাঞ্জি (N5)" sub="চিত্রলিপি ও অর্থ" char="日" icon={Book}
          color={{ bg: 'bg-emerald-100', text: 'text-emerald-600', hoverBg: 'group-hover:bg-emerald-600', hoverText: 'group-hover:text-white' }}
          onClick={() => onSelect('kanji')}
        />
        <QuizCard 
          title="ভোকাবুলারি" sub="দৈনন্দিন শব্দার্থ" char="語" icon={MessageCircle}
          color={{ bg: 'bg-amber-100', text: 'text-amber-600', hoverBg: 'group-hover:bg-amber-600', hoverText: 'group-hover:text-white' }}
          onClick={() => onSelect('vocab')}
        />
      </div>
      
      <footer className="mt-12 text-slate-400 text-sm">
        © 2024 Japanese Learning App
      </footer>
    </div>
  );
    }
            
