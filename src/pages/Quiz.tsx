"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const mockQuizData = {
  1: {
    title: "Crop Rotation Basics",
    questions: [
      {
        id: 1,
        question: "What is the main benefit of crop rotation?",
        options: ["Increases soil fertility", "Reduces pest buildup", "Improves water retention", "All of the above"],
        correctAnswer: 3,
      },
      {
        id: 2,
        question: "How often should you rotate crops?",
        options: ["Every season", "Every 2-3 years", "Every 5 years", "Never"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which crops are good for nitrogen fixation?",
        options: ["Corn and wheat", "Beans and peas", "Tomatoes and peppers", "Carrots and onions"],
        correctAnswer: 1,
      },
    ],
  },
}

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const quizData = mockQuizData[id as keyof typeof mockQuizData]

  if (!quizData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-foreground">{t("quizNotFound")}</p>
      </div>
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quizData.questions.length) * 100)

    return (
      <div className="min-h-screen bg-background px-[20vw] pt-[90px]">
        <Card className="mx-auto max-w-2xl bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">{t("quizCompleted")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-green-500">{percentage}%</div>
              <p className="text-muted-foreground">
                {score} {t("outOf")} {quizData.questions.length} {t("correct")}
              </p>
            </div>

            <div className="mb-6 space-y-4">
              {quizData.questions.map((question, index) => (
                <div key={question.id} className="text-left">
                  <p className="font-medium text-foreground">{question.question}</p>
                  <div className="flex items-center gap-2">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {t("yourAnswer")}: {question.options[selectedAnswers[index]]}
                    </span>
                  </div>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-600">
                      {t("correctAnswer")}: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/education")} variant="outline">
                {t("backToEducation")}
              </Button>
              <Button onClick={() => window.location.reload()} className="bg-green-500 hover:bg-green-600">
                {t("retakeQuiz")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quizData.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background px-[20vw] pt-[90px]">
      <Card className="mx-auto max-w-2xl bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">{quizData.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {quizData.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`,
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
              {t("exitQuiz")}
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-green-500 hover:bg-green-600"
            >
              {currentQuestion < quizData.questions.length - 1 ? t("nextQuestion") : t("finishQuiz")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
