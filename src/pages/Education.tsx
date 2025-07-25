"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { FaGraduationCap, FaQuestionCircle, FaTrophy } from "react-icons/fa"

const mockQuizzes = [
  {
    id: 1,
    title: "Crop Rotation Basics",
    description: "Learn the fundamentals of crop rotation and its benefits",
    questions: 10,
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Soil Management",
    description: "Understanding soil health and management techniques",
    questions: 15,
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "Pest Control Methods",
    description: "Natural and sustainable pest control strategies",
    questions: 12,
    difficulty: "Advanced",
  },
  {
    id: 4,
    title: "Water Conservation",
    description: "Efficient irrigation and water management practices",
    questions: 8,
    difficulty: "Beginner",
  },
]

export default function Education() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background px-[20vw] pt-[90px]">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">{t("educationTitle")}</h1>
        <p className="text-lg text-muted-foreground">{t("educationSubtitle")}</p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="bg-card text-center">
          <CardHeader>
            <FaGraduationCap className="mx-auto mb-4 text-4xl text-green-500" />
            <CardTitle className="text-foreground">{t("learningModules")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("learningModulesDesc")}</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-center">
          <CardHeader>
            <FaQuestionCircle className="mx-auto mb-4 text-4xl text-green-500" />
            <CardTitle className="text-foreground">{t("interactiveQuizzes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("interactiveQuizzesDesc")}</p>
          </CardContent>
        </Card>

        <Card className="bg-card text-center">
          <CardHeader>
            <FaTrophy className="mx-auto mb-4 text-4xl text-green-500" />
            <CardTitle className="text-foreground">{t("progressTracking")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("progressTrackingDesc")}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-8 text-3xl font-bold text-foreground">{t("availableQuizzes")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {mockQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="cursor-pointer bg-card transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-foreground">{quiz.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {quiz.questions} {t("questions")}
                  </span>
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      quiz.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : quiz.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{quiz.description}</p>
                <button className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                  {t("startQuiz")}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
