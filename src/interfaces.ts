import type { UUID } from "crypto"

export interface SignupData {
  firstName: string
  lastName: string
  password: string
  email: string
}

export interface LoginData {
  email: string
  password: string
}

export interface Crops {
  id: number
  created_at: string
  userId: number
  name: string
  image: string
  description: string
  category: string
  price: number
  location?: string
  quantity?: number
  unit?: string
  harvest_date?: string
  authUsers: {
    id: number
    firstName: string
    lastName: string
    email: string
    avatar: string
    authUserId: UUID
  }
}

export interface Crop {
  userId: number | undefined | null
  image: File | string
  description: string
  category: string
  price: number
  name: string
}

export interface AuthUsers {
  id: number
  authUserId: UUID
  avatar: string
  firstName: string
  lastName: string
  email: string
}

export interface Review {
  created_at: string
  id: number
  name: string
  email: string
  comment: string
  rate: number
  rating?: number
  cropId: number
  crop_id: number
}

export interface ReviewForm {
  name: string
  email: string
  comment: string
  rate: number
  cropId: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  questions: QuizQuestion[]
  timeLimit: number
  passingScore: number
  attempts: number
  bestScore?: number
  lastAttempt?: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[]
  completedAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  image: string
  progress: number
  totalContent: number
  completedContent: number
  content: CourseContent[]
}

export interface CourseContent {
  id: string
  type: "article" | "video"
  title: string
  duration: string
  completed: boolean
  content?: string
  videoUrl?: string
}

export interface UserProgress {
  id: number
  userId: number
  quizId: number
  score: number
  completed: boolean
  completedAt: string
}
