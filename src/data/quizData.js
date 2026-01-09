// src/data/quizData.js

// --- HIRAGANA DATA ---
export const hiraganaData = [
  // Basic
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
  // Dakuten
  { char: 'が', romaji: 'ga', type: 'dakuten' }, { char: 'ぎ', romaji: 'gi', type: 'dakuten' }, { char: 'ぐ', romaji: 'gu', type: 'dakuten' }, { char: 'げ', romaji: 'ge', type: 'dakuten' }, { char: 'ご', romaji: 'go', type: 'dakuten' },
  { char: 'ざ', romaji: 'za', type: 'dakuten' }, { char: 'じ', romaji: 'ji', type: 'dakuten' }, { char: 'ず', romaji: 'zu', type: 'dakuten' }, { char: 'ぜ', romaji: 'ze', type: 'dakuten' }, { char: 'ぞ', romaji: 'zo', type: 'dakuten' },
  { char: 'だ', romaji: 'da', type: 'dakuten' }, { char: 'ぢ', romaji: 'ji (di)', type: 'dakuten' }, { char: 'づ', romaji: 'zu (du)', type: 'dakuten' }, { char: 'で', romaji: 'de', type: 'dakuten' }, { char: 'ど', romaji: 'do', type: 'dakuten' },
  { char: 'ば', romaji: 'ba', type: 'dakuten' }, { char: 'び', romaji: 'bi', type: 'dakuten' }, { char: 'ぶ', romaji: 'bu', type: 'dakuten' }, { char: 'べ', romaji: 'be', type: 'dakuten' }, { char: 'ぼ', romaji: 'bo', type: 'dakuten' },
  { char: 'ぱ', romaji: 'pa', type: 'dakuten' }, { char: 'ぴ', romaji: 'pi', type: 'dakuten' }, { char: 'ぷ', romaji: 'pu', type: 'dakuten' }, { char: 'ぺ', romaji: 'pe', type: 'dakuten' }, { char: 'ぽ', romaji: 'po', type: 'dakuten' },
  // Combo
  { char: 'きゃ', romaji: 'kya', type: 'combo' }, { char: 'きゅ', romaji: 'kyu', type: 'combo' }, { char: 'きょ', romaji: 'kyo', type: 'combo' },
  { char: 'しゃ', romaji: 'sha', type: 'combo' }, { char: 'しゅ', romaji: 'shu', type: 'combo' }, { char: 'しょ', romaji: 'sho', type: 'combo' },
  { char: 'ちゃ', romaji: 'cha', type: 'combo' }, { char: 'ちゅ', romaji: 'chu', type: 'combo' }, { char: 'ちょ', romaji: 'cho', type: 'combo' },
  { char: 'にゃ', romaji: 'nya', type: 'combo' }, { char: 'にゅ', romaji: 'nyu', type: 'combo' }, { char: 'にょ', romaji: 'nyo', type: 'combo' },
  { char: 'ひゃ', romaji: 'hya', type: 'combo' }, { char: 'ひゅ', romaji: 'hyu', type: 'combo' }, { char: 'ひょ', romaji: 'hyo', type: 'combo' },
  { char: 'みゃ', romaji: 'mya', type: 'combo' }, { char: 'みゅ', romaji: 'myu', type: 'combo' }, { char: 'みょ', romaji: 'myo', type: 'combo' },
  { char: 'りゃ', romaji: 'rya', type: 'combo' }, { char: 'りゅ', romaji: 'ryu', type: 'combo' }, { char: 'りょ', romaji: 'ryo', type: 'combo' },
  { char: 'ぎゃ', romaji: 'gya', type: 'combo' }, { char: 'ぎゅ', romaji: 'gyu', type: 'combo' }, { char: 'ぎょ', romaji: 'gyo', type: 'combo' },
  { char: 'じゃ', romaji: 'ja', type: 'combo' }, { char: 'じゅ', romaji: 'ju', type: 'combo' }, { char: 'じょ', romaji: 'jo', type: 'combo' },
  { char: 'びゃ', romaji: 'bya', type: 'combo' }, { char: 'びゅ', romaji: 'byu', type: 'combo' }, { char: 'びょ', romaji: 'byo', type: 'combo' },
  { char: 'ぴゃ', romaji: 'pya', type: 'combo' }, { char: 'ぴゅ', romaji: 'pyu', type: 'combo' }, { char: 'ぴょ', romaji: 'pyo', type: 'combo' },
];

// --- KATAKANA DATA ---
export const katakanaData = [
  // Basic
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
  // Dakuten
  { char: 'ガ', romaji: 'ga', type: 'dakuten' }, { char: 'ギ', romaji: 'gi', type: 'dakuten' }, { char: 'グ', romaji: 'gu', type: 'dakuten' }, { char: 'ゲ', romaji: 'ge', type: 'dakuten' }, { char: 'ゴ', romaji: 'go', type: 'dakuten' },
  { char: 'ザ', romaji: 'za', type: 'dakuten' }, { char: 'ジ', romaji: 'ji', type: 'dakuten' }, { char: 'ズ', romaji: 'zu', type: 'dakuten' }, { char: 'ゼ', romaji: 'ze', type: 'dakuten' }, { char: 'ゾ', romaji: 'zo', type: 'dakuten' },
  { char: 'ダ', romaji: 'da', type: 'dakuten' }, { char: 'ヂ', romaji: 'ji (di)', type: 'dakuten' }, { char: 'ヅ', romaji: 'zu (du)', type: 'dakuten' }, { char: 'デ', romaji: 'de', type: 'dakuten' }, { char: 'ド', romaji: 'do', type: 'dakuten' },
  { char: 'バ', romaji: 'ba', type: 'dakuten' }, { char: 'ビ', romaji: 'bi', type: 'dakuten' }, { char: 'ブ', romaji: 'bu', type: 'dakuten' }, { char: 'ベ', romaji: 'be', type: 'dakuten' }, { char: 'ボ', romaji: 'bo', type: 'dakuten' },
  { char: 'パ', romaji: 'pa', type: 'dakuten' }, { char: 'ピ', romaji: 'pi', type: 'dakuten' }, { char: 'プ', romaji: 'pu', type: 'dakuten' }, { char: 'ペ', romaji: 'pe', type: 'dakuten' }, { char: 'ポ', romaji: 'po', type: 'dakuten' },
  // Combo
  { char: 'キャ', romaji: 'kya', type: 'combo' }, { char: 'キュ', romaji: 'kyu', type: 'combo' }, { char: 'キョ', romaji: 'kyo', type: 'combo' },
  { char: 'シャ', romaji: 'sha', type: 'combo' }, { char: 'シュ', romaji: 'shu', type: 'combo' }, { char: 'ショ', romaji: 'sho', type: 'combo' },
  { char: 'チャ', romaji: 'cha', type: 'combo' }, { char: 'チュ', romaji: 'chu', type: 'combo' }, { char: 'チョ', romaji: 'cho', type: 'combo' },
  { char: 'ニャ', romaji: 'nya', type: 'combo' }, { char: 'ニュ', romaji: 'nyu', type: 'combo' }, { char: 'ニョ', romaji: 'nyo', type: 'combo' },
  { char: 'ヒャ', romaji: 'hya', type: 'combo' }, { char: 'ヒュ', romaji: 'hyu', type: 'combo' }, { char: 'ヒョ', romaji: 'hyo', type: 'combo' },
  { char: 'ミャ', romaji: 'mya', type: 'combo' }, { char: 'ミュ', romaji: 'myu', type: 'combo' }, { char: 'ミョ', romaji: 'myo', type: 'combo' },
  { char: 'リャ', romaji: 'rya', type: 'combo' }, { char: 'リュ', romaji: 'ryu', type: 'combo' }, { char: 'リョ', romaji: 'ryo', type: 'combo' },
  { char: 'ギャ', romaji: 'gya', type: 'combo' }, { char: 'ギュ', romaji: 'gyu', type: 'combo' }, { char: 'ギョ', romaji: 'gyo', type: 'combo' },
  { char: 'ジャ', romaji: 'ja', type: 'combo' }, { char: 'ジュ', romaji: 'ju', type: 'combo' }, { char: 'ジョ', romaji: 'jo', type: 'combo' },
  { char: 'ビャ', romaji: 'bya', type: 'combo' }, { char: 'ビュ', romaji: 'byu', type: 'combo' }, { char: 'ビョ', romaji: 'byo', type: 'combo' },
  { char: 'ピャ', romaji: 'pya', type: 'combo' }, { char: 'ピュ', romaji: 'pyu', type: 'combo' }, { char: 'ピョ', romaji: 'pyo', type: 'combo' },
];

// --- KANJI DATA (JLPT N5 examples) ---
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
  { char: '火', romaji: 'ka / hi', meaning: 'Fire', type: 'n5' },
  { char: '水', romaji: 'sui / mizu', meaning: 'Water', type: 'n5' },
  { char: '金', romaji: 'kin / kane', meaning: 'Gold / Money', type: 'n5' },
  { char: '土', romaji: 'do / tsuchi', meaning: 'Earth / Soil', type: 'n5' },
  { char: '子', romaji: 'shi / ko', meaning: 'Child', type: 'n5' },
  { char: '女', romaji: 'jo / onna', meaning: 'Woman', type: 'n5' },
  { char: '学', romaji: 'gaku / mana', meaning: 'Study', type: 'n5' },
  { char: '生', romaji: 'sei / i', meaning: 'Life / Birth', type: 'n5' },
  { char: '先', romaji: 'sen / saki', meaning: 'Previous', type: 'n5' },
  { char: '私', romaji: 'shi / watashi', meaning: 'I / Me', type: 'n5' },
];

// --- VOCABULARY DATA ---
export const vocabData = [
  { char: 'こんにちは', romaji: 'konnichiwa', meaning: 'Hello', type: 'greetings' },
  { char: 'ありがとう', romaji: 'arigatou', meaning: 'Thank you', type: 'greetings' },
  { char: 'さようなら', romaji: 'sayounara', meaning: 'Goodbye', type: 'greetings' },
  { char: 'おはよう', romaji: 'ohayou', meaning: 'Good morning', type: 'greetings' },
  { char: 'こんばんわ', romaji: 'konbanwa', meaning: 'Good evening', type: 'greetings' },
  { char: 'ねこ', romaji: 'neko', meaning: 'Cat', type: 'animals' },
  { char: 'いぬ', romaji: 'inu', meaning: 'Dog', type: 'animals' },
  { char: 'とり', romaji: 'tori', meaning: 'Bird', type: 'animals' },
  { char: 'さかな', romaji: 'sakana', meaning: 'Fish', type: 'animals' },
  { char: 'みず', romaji: 'mizu', meaning: 'Water', type: 'food' },
  { char: 'ごはん', romaji: 'gohan', meaning: 'Rice / Meal', type: 'food' },
  { char: 'パン', romaji: 'pan', meaning: 'Bread', type: 'food' },
  { char: 'ともだち', romaji: 'tomodachi', meaning: 'Friend', type: 'people' },
  { char: 'せんせい', romaji: 'sensei', meaning: 'Teacher', type: 'people' },
  { char: 'がくせい', romaji: 'gakusei', meaning: 'Student', type: 'people' },
  { char: 'ほん', romaji: 'hon', meaning: 'Book', type: 'objects' },
  { char: 'えんぴつ', romaji: 'enpitsu', meaning: 'Pencil', type: 'objects' },
  { char: 'いえ', romaji: 'ie', meaning: 'House', type: 'places' },
  { char: 'がっこう', romaji: 'gakkou', meaning: 'School', type: 'places' },
];
  
