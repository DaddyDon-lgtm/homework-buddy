// The looks the student can pick from the home screen.

export const THEMES = [
  {
    id: 'idol',
    zh: '舞台',
    en: 'Stage',
    icon: '✦',
    barColor: '#140c30',
    cheer: { big: 'PERFECT!', small: '答對了 ✦' },
    sparkles: ['✦', '★', '✧', '♪'],
  },
  {
    id: 'kawaii',
    zh: '可愛',
    en: 'Kawaii',
    icon: '♡',
    barColor: '#ffe3f1',
    cheer: { big: 'Yay!', small: '好棒！♡' },
    sparkles: ['♡', '★', '✿', '♪'],
  },
  {
    id: 'manga',
    zh: '漫畫',
    en: 'Manga',
    icon: '💥',
    barColor: '#fffdf4',
    cheer: { big: '正解！', small: 'NICE!' },
    sparkles: ['!', '★', '✦', '!'],
  },
]

export function themeById(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0]
}

export function applyTheme(id) {
  const theme = themeById(id)
  document.documentElement.dataset.theme = theme.id
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme.barColor)
}
