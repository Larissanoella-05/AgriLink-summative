

export interface SignupData {
  firstName: string
  lastName: string
  password: string
  email: string
  phoneNumber?: string
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
  authUsers?: AuthUsers
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
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  avatar?: string
  created_at: string
  updated_at: string
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

export interface Order {
  id: number
  user_id: string
  farmer_id: string
  total_amount: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  created_at: string
  updated_at: string
  items: OrderItem[]
  buyer?: AuthUsers
  farmer?: AuthUsers
}

export interface OrderItem {
  id: number
  order_id: number
  crop_id: number
  quantity: number
  price: number
  crops?: Crops
}

export interface NotificationSettings {
  emailNotifications: boolean
  orderUpdates: boolean
  reviewNotifications: boolean
  marketingEmails: boolean
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

export interface Reviews {
  id: number
  crop_id: number
  user_id: string
  rating: number
  comment?: string
  created_at: string
  authUsers?: AuthUsers
  crops?: Crops
}
