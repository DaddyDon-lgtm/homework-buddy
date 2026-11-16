// Lessons by subject. Add a subject here and its topic cards get lesson buttons.
import { US_ENGLISH_LESSONS } from './usEnglish.js'
import { US_SOCIAL_LESSONS } from './usSocial.js'

export const LESSON_SETS = {
  'us-english': { label: 'US English', lessons: US_ENGLISH_LESSONS },
  'us-social': { label: 'US Social Studies', lessons: US_SOCIAL_LESSONS },
}

export function lessonsFor(subjectId) {
  return LESSON_SETS[subjectId]?.lessons || []
}

export function lessonForTopic(subjectId, topic) {
  return lessonsFor(subjectId).find((l) => l.topic === topic) || null
}

export function findLesson(id) {
  for (const [subjectId, set] of Object.entries(LESSON_SETS)) {
    const i = set.lessons.findIndex((l) => l.id === id)
    if (i >= 0) return { lesson: set.lessons[i], subjectId, number: i + 1 }
  }
  return null
}

export function lessonsDone(lessonsState, subjectId) {
  return lessonsFor(subjectId).filter((l) => lessonsState?.[l.id]?.done).length
}
