// src/data/quizData.js

export const hiraganaData = [
  { char: 'あ', romaji: 'a', type: 'basic' }, { char: 'い', romaji: 'i', type: 'basic' },
  { char: 'か', romaji: 'ka', type: 'basic' }, { char: 'さ', romaji: 'sa', type: 'basic' },
  { char: 'た', romaji: 'ta', type: 'basic' }, { char: 'な', romaji: 'na', type: 'basic' },
  { char: 'が', romaji: 'ga', type: 'dakuten' }, { char: 'ぱ', romaji: 'pa', type: 'dakuten' },
  { char: 'きゃ', romaji: 'kya', type: 'combo' }, { char: 'しゃ', romaji: 'sha', type: 'combo' },
  // ... (বাকি ডাটা যা আপনার আগের কোডে ছিল তা এখানে রাখবেন)
];

export const katakanaData = [
  { char: 'ア', romaji: 'a', type: 'basic' }, { char: 'イ', romaji: 'i', type: 'basic' },
  { char: 'カ', romaji: 'ka', type: 'basic' }, { char: 'ガ', romaji: 'ga', type: 'dakuten' },
  // ... (বাকি ডাটা)
];

// নতুন: কাঞ্জি ডাটা (JLPT N5)
export const kanjiData = [
  { char: '日', romaji: 'nichi / hi', meaning: 'Day / Sun', type: 'n5' },
  { char: '月', romaji: 'getsu / tsuki', meaning: 'Month / Moon', type: 'n5' },
  { char: '木', romaji: 'moku / ki', meaning: 'Tree', type: 'n5' },
  { char: '山', romaji: 'san / yama', meaning: 'Mountain', type: 'n5' },
  { char: '川', romaji: 'sen / kawa', meaning: 'River', type: 'n5' },
  { char: '田', romaji: 'den / ta', meaning: 'Rice Field', type: 'n5' },
  { char: '人', romaji: 'jin / hito', meaning: 'Person', type: 'n5' },
  { char: '口', romaji: 'kou / kuchi', meaning: 'Mouth', type: 'n5' },
  { char: '車', romaji: 'sha / kuruma', meaning: 'Car', type: 'n5' },
  { char: '門', romaji: 'mon / kado', meaning: 'Gate', type: 'n5' },
];

// নতুন: ভোকাবুলারি ডাটা
export const vocabData = [
  { char: 'こんにちは', romaji: 'konnichiwa', meaning: 'Hello', type: 'greetings' },
  { char: 'ありがとう', romaji: 'arigatou', meaning: 'Thank you', type: 'greetings' },
  { char: 'さようなら', romaji: 'sayounara', meaning: 'Goodbye', type: 'greetings' },
  { char: 'ねこ', romaji: 'neko', meaning: 'Cat', type: 'animals' },
  { char: 'いぬ', romaji: 'inu', meaning: 'Dog', type: 'animals' },
  { char: 'みず', romaji: 'mizu', meaning: 'Water', type: 'food' },
  { char: 'ごはん', romaji: 'gohan', meaning: 'Rice / Meal', type: 'food' },
  { char: 'ともだち', romaji: 'tomodachi', meaning: 'Friend', type: 'people' },
];
