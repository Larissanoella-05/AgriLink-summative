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
  cropId: number
}

export interface ReviewForm {
  name: string
  email: string
  comment: string
  rate: number
  cropId: number
}

export interface Quiz {
  id: number
  title: string
  description: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface UserProgress {
  id: number
  userId: number
  quizId: number
  score: number
  completed: boolean
  completedAt: string
}
