// Common Grade 5 topics in Taiwan's 108 curriculum (plus US Grade 5 English).
// These are curriculum-level topics, not one publisher's exact unit titles.
// The student can also type any topic.

export const SUBJECTS = [
  {
    id: 'math',
    zh: '數學',
    en: 'Math',
    emoji: '🔢',
    topics: [
      { zh: '因數與倍數', en: 'Factors and multiples' },
      { zh: '公因數與公倍數', en: 'Common factors and common multiples' },
      { zh: '擴分、約分與通分', en: 'Equivalent fractions and common denominators' },
      { zh: '異分母分數的加減', en: 'Adding and subtracting unlike fractions' },
      { zh: '分數的乘法', en: 'Multiplying fractions' },
      { zh: '小數的乘法', en: 'Multiplying decimals' },
      { zh: '小數的除法', en: 'Dividing decimals' },
      { zh: '整數四則運算', en: 'Order of operations' },
      { zh: '三角形與四邊形的面積', en: 'Area of triangles and quadrilaterals' },
      { zh: '長方體與正方體的體積', en: 'Volume of cuboids and cubes' },
      { zh: '線對稱圖形', en: 'Line symmetry' },
      { zh: '比率與百分率', en: 'Ratios and percentages' },
      { zh: '時間的計算', en: 'Calculating with time' },
    ],
  },
  {
    id: 'mandarin',
    zh: '國語',
    en: 'Mandarin',
    emoji: '📖',
    topics: [
      { zh: '成語', en: 'Idioms (chengyu)' },
      { zh: '近義詞與反義詞', en: 'Synonyms and antonyms' },
      { zh: '修辭：譬喻、擬人、排比', en: 'Rhetoric: simile, personification, parallelism' },
      { zh: '形近字與改錯字', en: 'Look-alike characters and fixing wrong characters' },
      { zh: '同音字與多音字', en: 'Homophones and characters with several readings' },
      { zh: '量詞', en: 'Measure words' },
      { zh: '關聯詞與句型', en: 'Conjunctions and sentence patterns' },
      { zh: '標點符號', en: 'Punctuation' },
      { zh: '閱讀理解', en: 'Reading comprehension' },
    ],
  },
  {
    id: 'english',
    zh: '英語',
    en: 'English',
    emoji: '🔤',
    topics: [
      { zh: '情境字彙', en: 'Vocabulary in context' },
      { zh: '閱讀理解', en: 'Reading comprehension' },
      { zh: '主旨與推論', en: 'Main idea and inference' },
      { zh: '字首、字尾與字根', en: 'Prefixes, suffixes and roots' },
      { zh: '比喻語言與慣用語', en: 'Figurative language and idioms' },
      { zh: '同義字與反義字', en: 'Synonyms and antonyms' },
      { zh: '動詞時態', en: 'Verb tenses' },
    ],
  },
  {
    id: 'science',
    zh: '自然',
    en: 'Science',
    emoji: '🔬',
    topics: [
      { zh: '太陽的觀測', en: 'Observing the sun' },
      { zh: '植物的構造與功能', en: 'Plant structures and functions' },
      { zh: '水溶液的性質', en: 'Properties of solutions (acids and bases)' },
      { zh: '力與運動', en: 'Forces and motion' },
      { zh: '星星與星座', en: 'Stars and constellations' },
      { zh: '燃燒與生鏽', en: 'Burning and rusting' },
      { zh: '動物的生活', en: 'How animals live' },
      { zh: '聲音與樂器', en: 'Sound and instruments' },
    ],
  },
  {
    id: 'social',
    zh: '社會',
    en: 'Social Studies',
    emoji: '🌏',
    topics: [
      { zh: '臺灣的位置與地形', en: "Taiwan's location and landforms" },
      { zh: '臺灣的氣候與河川', en: "Taiwan's climate and rivers" },
      { zh: '史前文化與原住民族', en: 'Prehistoric cultures and Indigenous peoples' },
      { zh: '荷西與鄭氏時期', en: 'The Dutch, Spanish and Zheng periods' },
      { zh: '清領時期的臺灣', en: 'Taiwan under Qing rule' },
      { zh: '日治時期的臺灣', en: 'Taiwan under Japanese rule' },
      { zh: '戰後的臺灣', en: 'Taiwan after the war' },
    ],
  },
]

export function subjectById(id) {
  return SUBJECTS.find((s) => s.id === id) || {
    id: 'other',
    zh: '其他',
    en: 'Other',
    emoji: '✏️',
    topics: [],
  }
}
