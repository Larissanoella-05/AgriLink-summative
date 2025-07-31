"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { FaGraduationCap, FaQuestionCircle, FaTrophy, FaBook, FaVideo, FaChartLine } from "react-icons/fa"
import { motion } from "framer-motion"

interface Course {
  id: number
  title: string
  description: string
  duration: string
  difficulty: string
  articles: number
  videos: number
  completed: boolean
  progress: number
  image: string
}

interface Quiz {
  id: number
  title: string
  description: string
  questions: number
  difficulty: string
  completed: boolean
  score: number | null
  courseId: number
}

export default function Education() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"courses" | "quizzes" | "progress">("courses")
  const [courses, setCourses] = useState<Course[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

 
  useEffect(() => {
    const savedCourses = localStorage.getItem("agrilink-courses")
    const savedQuizzes = localStorage.getItem("agrilink-quizzes")

    const defaultCourses: Course[] = [
      {
        id: 1,
        title: "Crop Rotation Fundamentals",
        description: "Learn the basics of crop rotation and its benefits for soil health",
        duration: "45 min",
        difficulty: "Beginner",
        articles: 3,
        videos: 2,
        completed: false,
        progress: 0,
        image: "/Images/carousel/1.jpg",
      },
      {
        id: 2,
        title: "Soil Management Techniques",
        description: "Understanding soil composition, testing, and improvement methods",
        duration: "60 min",
        difficulty: "Intermediate",
        articles: 4,
        videos: 3,
        completed: false,
        progress: 0,
        image: "/Images/carousel/2.jpg",
      },
      {
        id: 3,
        title: "Sustainable Pest Control",
        description: "Natural and eco-friendly approaches to pest management",
        duration: "50 min",
        difficulty: "Advanced",
        articles: 5,
        videos: 4,
        completed: false,
        progress: 0,
        image: "/Images/carousel/3.jpg",
      },
      {
        id: 4,
        title: "Water Conservation Methods",
        description: "Efficient irrigation and water management for crops",
        duration: "40 min",
        difficulty: "Beginner",
        articles: 3,
        videos: 2,
        completed: false,
        progress: 0,
        image: "/Images/carousel/4.jpg",
      },
    ]

    const defaultQuizzes: Quiz[] = [
      {
        id: 1,
        title: "Crop Rotation Quiz",
        description: "Test your knowledge on crop rotation principles",
        questions: 10,
        difficulty: "Beginner",
        completed: false,
        score: null,
        courseId: 1,
      },
      {
        id: 2,
        title: "Soil Health Assessment",
        description: "Evaluate your understanding of soil management",
        questions: 15,
        difficulty: "Intermediate",
        completed: false,
        score: null,
        courseId: 2,
      },
      {
        id: 3,
        title: "Pest Control Strategies",
        description: "Advanced quiz on sustainable pest management",
        questions: 12,
        difficulty: "Advanced",
        completed: false,
        score: null,
        courseId: 3,
      },
    ]

    setCourses(savedCourses ? JSON.parse(savedCourses) : defaultCourses)
    setQuizzes(savedQuizzes ? JSON.parse(savedQuizzes) : defaultQuizzes)
  }, [])

  
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("agrilink-courses", JSON.stringify(courses))
    }
  }, [courses])

  useEffect(() => {
    if (quizzes.length > 0) {
      localStorage.setItem("agrilink-quizzes", JSON.stringify(quizzes))
    }
  }, [quizzes])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallProgress =
    courses.length > 0 ? Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length) : 0
  const completedCourses = courses.filter((course) => course.completed).length
  const completedQuizzes = quizzes.filter((quiz) => quiz.completed).length
  const averageScore =
    completedQuizzes > 0
      ? Math.round(quizzes.filter((q) => q.score).reduce((acc, q) => acc + (q.score || 0), 0) / completedQuizzes)
      : 0

  return (
    <div className="min-h-screen bg-background px-4 lg:px-[10vw] pt-[90px]">
      {}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-4xl font-bold text-foreground font-display">{t("educationTitle")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("educationSubtitle")}</p>
      </motion.div>

      {}
      <motion.div
        className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200">
          <CardContent className="p-6 text-center">
            <FaGraduationCap className="mx-auto mb-3 text-3xl text-green-600" />
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">{overallProgress}%</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Overall Progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200">
          <CardContent className="p-6 text-center">
            <FaBook className="mx-auto mb-3 text-3xl text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              {completedCourses}/{courses.length}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">Courses Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200">
          <CardContent className="p-6 text-center">
            <FaQuestionCircle className="mx-auto mb-3 text-3xl text-purple-600" />
            <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
              {completedQuizzes}/{quizzes.length}
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Quizzes Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 border-yellow-200">
          <CardContent className="p-6 text-center">
            <FaTrophy className="mx-auto mb-3 text-3xl text-yellow-600" />
            <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{averageScore}%</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">Average Score</p>
          </CardContent>
        </Card>
      </motion.div>

      {}
      <div className="mb-8 flex justify-center">
        <div className="flex rounded-lg bg-muted p-1">
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "courses"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FaBook />
            Learning Content
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "quizzes"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FaQuestionCircle />
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "progress"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FaChartLine />
            Progress
          </button>
        </div>
      </div>

      {}
      {activeTab === "courses" && (
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              onClick={() => navigate(`/education/course/${course.id}`)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getDifficultyColor(course.difficulty)}`}
                  >
                    {course.difficulty}
                  </span>
                </div>
                {course.completed && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                      <FaTrophy size={10} />
                      Completed
                    </div>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-foreground group-hover:text-green-600 transition-colors">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardHeader>

              <CardContent>
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FaBook size={12} />
                    {course.articles} articles
                  </span>
                  <span className="flex items-center gap-1">
                    <FaVideo size={12} />
                    {course.videos} videos
                  </span>
                  <span>{course.duration}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  {course.progress === 0 ? "Start Course" : course.completed ? "Review Course" : "Continue Course"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {activeTab === "quizzes" && (
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground hover:text-green-600 transition-colors">{quiz.title}</CardTitle>
                  {quiz.completed && (
                    <div className="flex items-center gap-1 text-green-600">
                      <FaTrophy size={16} />
                      <span className="text-sm font-medium">{quiz.score}%</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{quiz.description}</p>
              </CardHeader>

              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{quiz.questions} questions</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <Button className="w-full" variant={quiz.completed ? "outline" : "default"}>
                  {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {activeTab === "progress" && (
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaChartLine className="text-green-600" />
                Learning Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{overallProgress}%</div>
                  <p className="text-sm text-muted-foreground">Overall Completion</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{completedCourses}</div>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{averageScore}%</div>
                  <p className="text-sm text-muted-foreground">Average Quiz Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-foreground">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                      {course.completed && <FaTrophy className="text-yellow-500" size={20} />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">{quiz.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {quiz.questions} questions • {quiz.difficulty}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {quiz.completed ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-lg font-bold ${quiz.score && quiz.score >= 80 ? "text-green-600" : quiz.score && quiz.score >= 60 ? "text-yellow-600" : "text-red-600"}`}
                          >
                            {quiz.score}%
                          </span>
                          <FaTrophy className="text-yellow-500" size={16} />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not completed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
