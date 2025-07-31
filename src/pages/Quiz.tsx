"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface Quiz {
  id: number
  title: string
  description: string
  questions: QuizQuestion[]
}

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    const quizId = Number.parseInt(id || "1")

    const quizData: { [key: number]: Quiz } = {
      1: {
        id: 1,
        title: "Crop Rotation Quiz",
        description: "Test your knowledge about crop rotation techniques and benefits",
        questions: [
          {
            id: 1,
            question: "What is the main benefit of crop rotation?",
            options: [
              "Increases soil fertility",
              "Reduces pest buildup",
              "Improves water retention",
              "All of the above",
            ],
            correctAnswer: 3,
          },
          {
            id: 2,
            question: "How often should you rotate crops in Rwanda's climate?",
            options: ["Every season", "Every 2-3 years", "Every 5 years", "Never"],
            correctAnswer: 1,
          },
          {
            id: 3,
            question: "Which crops are good for nitrogen fixation?",
            options: ["Corn and wheat", "Beans and peas", "Tomatoes and peppers", "Carrots and onions"],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "What should follow a nitrogen-fixing crop in rotation?",
            options: ["Another legume", "A heavy nitrogen user like maize", "Root vegetables", "Nothing"],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "Which is NOT a benefit of crop rotation?",
            options: ["Pest control", "Soil health improvement", "Increased labor costs", "Weed management"],
            correctAnswer: 2,
          },
        ],
      },
      2: {
        id: 2,
        title: "Soil Health Assessment",
        description: "Learn about soil composition and management techniques",
        questions: [
          {
            id: 1,
            question: "What percentage of healthy soil is typically organic matter?",
            options: ["1-2%", "5%", "15%", "25%"],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "What is the ideal pH range for most crops?",
            options: ["4.0-5.0", "6.0-7.0", "8.0-9.0", "9.0-10.0"],
            correctAnswer: 1,
          },
          {
            id: 3,
            question: "Which soil type retains water best?",
            options: ["Sandy soil", "Clay soil", "Rocky soil", "Gravel soil"],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "What is the best way to improve soil organic matter?",
            options: ["Add chemical fertilizers", "Add compost and manure", "Add sand", "Add lime"],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "How can you prevent soil erosion on slopes?",
            options: ["Plant more trees", "Use contour farming", "Build terraces", "All of the above"],
            correctAnswer: 3,
          },
        ],
      },
      3: {
        id: 3,
        title: "Pest Control Strategies",
        description: "Understanding integrated pest management and natural control methods",
        questions: [
          {
            id: 1,
            question: "What is Integrated Pest Management (IPM)?",
            options: [
              "Using only chemical pesticides",
              "Combining multiple pest control methods",
              "Using only organic methods",
              "Ignoring pest problems",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Which is a natural pest deterrent?",
            options: ["Marigolds", "Neem oil", "Companion planting", "All of the above"],
            correctAnswer: 3,
          },
          {
            id: 3,
            question: "When should pesticides be used as a last resort?",
            options: [
              "At the first sign of pests",
              "When natural methods have failed",
              "Every week as prevention",
              "Never",
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "What attracts beneficial insects to your farm?",
            options: ["Diverse flowering plants", "Pesticide spraying", "Bare soil", "Monoculture crops"],
            correctAnswer: 0,
          },
          {
            id: 5,
            question: "Which practice helps break pest life cycles?",
            options: ["Crop rotation", "Continuous cropping", "Heavy fertilization", "Deep plowing only"],
            correctAnswer: 0,
          },
        ],
      },
    }

    setQuiz(quizData[quizId] || null)
  }, [id])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (!quiz) return

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      saveQuizResults()
    }
  }

  const saveQuizResults = () => {
    if (!quiz) return

    const score = calculateScore()
    const percentage = Math.round((score / quiz.questions.length) * 100)

  
    const savedQuizzes = localStorage.getItem("agrilink-quizzes")
    if (savedQuizzes) {
      const quizzes = JSON.parse(savedQuizzes)
      const quizIndex = quizzes.findIndex((q: any) => q.id === quiz.id)
      if (quizIndex !== -1) {
        quizzes[quizIndex].completed = true
        quizzes[quizIndex].score = percentage
        localStorage.setItem("agrilink-quizzes", JSON.stringify(quizzes))
      }
    }
  }

  const calculateScore = () => {
    if (!quiz) return 0

    let correct = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground">{t("quizNotFound") || "Quiz not found"}</p>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quiz.questions.length) * 100)

    return (
      <div className="min-h-screen bg-background px-4 lg:px-[20vw] pt-[90px]">
        <Card className="mx-auto max-w-2xl bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">{t("quizCompleted") || "Quiz Completed!"}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div
                className={`text-4xl font-bold mb-2 ${
                  percentage >= 80 ? "text-green-500" : percentage >= 60 ? "text-yellow-500" : "text-red-500"
                }`}
              >
                {percentage}%
              </div>
              <p className="text-muted-foreground">
                {score} {t("outOf") || "out of"} {quiz.questions.length} {t("correct") || "correct"}
              </p>
            </div>

            <div className="mb-6 space-y-4">
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="text-left">
                  <p className="font-medium text-foreground">{question.question}</p>
                  <div className="flex items-center gap-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {t("yourAnswer") || "Your answer"}: {quiz.questions[index].options[selectedAnswers[index]]}
                    </span>
                  </div>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-600">
                      {t("correctAnswer") || "Correct answer"}: {quiz.questions[index].options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/education")} variant="outline">
                {t("backToEducation") || "Back to Education"}
              </Button>
              <Button onClick={() => window.location.reload()} className="bg-green-500 hover:bg-green-600">
                {t("retakeQuiz") || "Retake Quiz"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background px-4 lg:px-[20vw] pt-[90px]">
      <Card className="mx-auto max-w-2xl bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">{quiz.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {quiz.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <span className="text-foreground">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => navigate("/education")} variant="outline">
              {t("exitQuiz") || "Exit Quiz"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-green-500 hover:bg-green-600"
            >
              {currentQuestion < quiz.questions.length - 1
                ? t("nextQuestion") || "Next Question"
                : t("finishQuiz") || "Finish Quiz"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
