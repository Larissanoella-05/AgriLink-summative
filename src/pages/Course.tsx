"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { FaBook, FaVideo, FaClock, FaArrowLeft, FaArrowRight, FaCheck, FaPlay } from "react-icons/fa"

interface CourseContent {
  id: number
  type: "article" | "video"
  title: string
  content?: string
  videoUrl?: string
  duration: string
  completed: boolean
}

interface Course {
  id: number
  title: string
  description: string
  difficulty: string
  totalDuration: string
  contents: CourseContent[]
}

export default function Course() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    // Get course data from localStorage or use defaults
    const courseId = Number.parseInt(id || "1")
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`)

    const courseData: { [key: number]: Course } = {
      1: {
        id: 1,
        title: "Crop Rotation Fundamentals",
        description: "Learn the basics of crop rotation and its benefits for soil health",
        difficulty: "Beginner",
        totalDuration: "45 min",
        contents: [
          {
            id: 1,
            type: "article",
            title: "Introduction to Crop Rotation",
            content: `
              <h2>What is Crop Rotation?</h2>
              <p>Crop rotation is the practice of growing different types of crops in the same area across different seasons or years. This agricultural technique has been used for thousands of years and remains one of the most effective methods for maintaining soil health and maximizing crop yields.</p>
              
              <h3>Why is Crop Rotation Important?</h3>
              <ul>
                <li><strong>Soil Health:</strong> Different crops have varying nutrient requirements and contributions to the soil</li>
                <li><strong>Pest Control:</strong> Rotating crops disrupts pest and disease cycles</li>
                <li><strong>Weed Management:</strong> Different crops allow for varied weed control strategies</li>
                <li><strong>Improved Yields:</strong> Proper rotation can increase overall farm productivity</li>
              </ul>

              <h3>Basic Principles</h3>
              <p>The fundamental principle of crop rotation is to avoid growing the same crop family in the same location year after year. Instead, farmers alternate between different crop types such as:</p>
              <ul>
                <li>Legumes (beans, peas) - fix nitrogen in soil</li>
                <li>Grasses (corn, wheat) - heavy nitrogen users</li>
                <li>Brassicas (cabbage, broccoli) - break pest cycles</li>
                <li>Root crops (carrots, potatoes) - improve soil structure</li>
              </ul>

              <h3>Benefits for Rwandan Agriculture</h3>
              <p>In Rwanda's context, crop rotation is particularly beneficial because:</p>
              <ul>
                <li>It helps maintain soil fertility in our hilly terrain</li>
                <li>Reduces dependency on expensive fertilizers</li>
                <li>Increases food security through diversified production</li>
                <li>Supports sustainable farming practices</li>
              </ul>
            `,
            duration: "10 min",
            completed: false,
          },
          {
            id: 2,
            type: "video",
            title: "Crop Rotation in Practice",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "15 min",
            completed: false,
          },
          {
            id: 3,
            type: "article",
            title: "Planning Your Rotation Schedule",
            content: `
              <h2>Creating an Effective Rotation Plan</h2>
              <p>Planning a successful crop rotation requires understanding your land, climate, and market demands. Here's how to create an effective rotation schedule for your farm.</p>

              <h3>Step 1: Assess Your Land</h3>
              <ul>
                <li>Soil type and pH levels</li>
                <li>Drainage patterns</li>
                <li>Slope and erosion risk</li>
                <li>Available water sources</li>
              </ul>

              <h3>Step 2: Choose Your Crops</h3>
              <p>Select crops based on:</p>
              <ul>
                <li>Market demand and profitability</li>
                <li>Climate suitability</li>
                <li>Complementary nutrient cycles</li>
                <li>Labor requirements</li>
              </ul>

              <h3>Sample 4-Year Rotation for Rwanda</h3>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>Year 1:</strong> Beans (nitrogen fixation)<br>
                <strong>Year 2:</strong> Maize (heavy nitrogen user)<br>
                <strong>Year 3:</strong> Irish potatoes (root crop)<br>
                <strong>Year 4:</strong> Sorghum (drought tolerant grain)
              </div>

              <h3>Monitoring and Adjusting</h3>
              <p>Keep detailed records of:</p>
              <ul>
                <li>Crop yields each season</li>
                <li>Pest and disease occurrences</li>
                <li>Soil test results</li>
                <li>Weather patterns and their effects</li>
              </ul>
            `,
            duration: "12 min",
            completed: false,
          },
          {
            id: 4,
            type: "video",
            title: "Success Stories from Rwandan Farmers",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "8 min",
            completed: false,
          },
        ],
      },
      2: {
        id: 2,
        title: "Soil Management Techniques",
        description: "Understanding soil composition, testing, and improvement methods",
        difficulty: "Intermediate",
        totalDuration: "60 min",
        contents: [
          {
            id: 1,
            type: "article",
            title: "Understanding Soil Composition",
            content: `
              <h2>Soil Composition Basics</h2>
              <p>Soil is a complex mixture of minerals, organic matter, water, and air. Understanding its composition is crucial for effective farming.</p>
              
              <h3>Main Components</h3>
              <ul>
                <li><strong>Minerals (45%):</strong> Sand, silt, and clay particles</li>
                <li><strong>Organic Matter (5%):</strong> Decomposed plant and animal materials</li>
                <li><strong>Water (25%):</strong> Essential for plant growth and nutrient transport</li>
                <li><strong>Air (25%):</strong> Provides oxygen for root respiration</li>
              </ul>

              <h3>Soil Texture Types</h3>
              <p>Rwanda's soils vary significantly across regions:</p>
              <ul>
                <li><strong>Clay soils:</strong> Common in valleys, retain water well but may have drainage issues</li>
                <li><strong>Sandy soils:</strong> Found on hillsides, drain quickly but may need more frequent watering</li>
                <li><strong>Loamy soils:</strong> The ideal mix, found in some fertile areas</li>
              </ul>
            `,
            duration: "15 min",
            completed: false,
          },
          {
            id: 2,
            type: "video",
            title: "Soil Testing Methods",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "20 min",
            completed: false,
          },
          {
            id: 3,
            type: "article",
            title: "Improving Soil Health",
            content: `
              <h2>Strategies for Soil Improvement</h2>
              <p>Healthy soil is the foundation of productive agriculture. Here are proven methods to improve your soil quality.</p>

              <h3>Organic Matter Addition</h3>
              <ul>
                <li>Compost from kitchen scraps and farm waste</li>
                <li>Animal manure (properly composted)</li>
                <li>Green manure crops like legumes</li>
                <li>Mulching with organic materials</li>
              </ul>

              <h3>pH Management</h3>
              <p>Most crops prefer slightly acidic to neutral soil (pH 6.0-7.0):</p>
              <ul>
                <li>Use lime to raise pH in acidic soils</li>
                <li>Add organic matter to buffer pH changes</li>
                <li>Test soil pH regularly</li>
              </ul>

              <h3>Erosion Control</h3>
              <p>Rwanda's hilly terrain requires special attention to erosion:</p>
              <ul>
                <li>Contour farming on slopes</li>
                <li>Terracing for steep areas</li>
                <li>Cover crops to protect soil</li>
                <li>Agroforestry systems</li>
              </ul>
            `,
            duration: "18 min",
            completed: false,
          },
          {
            id: 4,
            type: "video",
            title: "Composting Techniques",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "12 min",
            completed: false,
          },
        ],
      },
    }

    let courseInfo = courseData[courseId]

    // Load saved progress if exists
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      courseInfo = { ...courseInfo, contents: progress }
    }

    setCourse(courseInfo || null)
  }, [id])

  const handleContentComplete = () => {
    if (!course) return

    const updatedContents = [...course.contents]
    updatedContents[currentContentIndex].completed = true

    const updatedCourse = { ...course, contents: updatedContents }
    setCourse(updatedCourse)

    // Save progress to localStorage
    localStorage.setItem(`course-${course.id}-progress`, JSON.stringify(updatedContents))

    // Update overall course progress in main courses list
    const savedCourses = localStorage.getItem("agrilink-courses")
    if (savedCourses) {
      const courses = JSON.parse(savedCourses)
      const courseIndex = courses.findIndex((c: any) => c.id === course.id)
      if (courseIndex !== -1) {
        const completedCount = updatedContents.filter((c) => c.completed).length
        const progress = Math.round((completedCount / updatedContents.length) * 100)
        courses[courseIndex].progress = progress
        courses[courseIndex].completed = progress === 100
        localStorage.setItem("agrilink-courses", JSON.stringify(courses))
      }
    }
  }

  const handleNext = () => {
    if (course && currentContentIndex < course.contents.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1)
    }
  }

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  }

  const currentContent = course.contents[currentContentIndex]
  const completedCount = course.contents.filter((c) => c.completed).length
  const progressPercentage = Math.round((completedCount / course.contents.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/education")}
                className="flex items-center gap-2"
              >
                <FaArrowLeft size={14} />
                {t("backToEducation") || "Back to Education"}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{course.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {course.difficulty} • {course.totalDuration}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">{t("progress") || "Progress"}</div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Contents */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("courseContents") || "Course Contents"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.contents.map((content, index) => (
                    <button
                      key={content.id}
                      onClick={() => setCurrentContentIndex(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        index === currentContentIndex
                          ? "bg-green-100 dark:bg-green-900 border-green-500 border"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            content.completed
                              ? "bg-green-500 text-white"
                              : index === currentContentIndex
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {content.completed ? (
                            <FaCheck size={12} />
                          ) : content.type === "video" ? (
                            <FaVideo size={12} />
                          ) : (
                            <FaBook size={12} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{content.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FaClock size={10} />
                            {content.duration}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {currentContent.type === "video" ? (
                    <FaVideo className="text-red-500" />
                  ) : (
                    <FaBook className="text-blue-500" />
                  )}
                  <div>
                    <CardTitle>{currentContent.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <FaClock size={12} />
                      {currentContent.duration}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {currentContent.type === "video" ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FaPlay className="mx-auto mb-2 text-4xl text-gray-400" />
                        <p className="text-gray-600">{t("videoPlayer") || "Video Player"}</p>
                        <p className="text-sm text-gray-500">
                          {t("videoPlayerNote") || "In a real app, this would be a video player"}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">URL: {currentContent.videoUrl}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={handleContentComplete}
                        disabled={currentContent.completed}
                        className="flex items-center gap-2"
                      >
                        {currentContent.completed ? (
                          <>
                            <FaCheck size={14} />
                            {t("completed") || "Completed"}
                          </>
                        ) : (
                          t("markAsComplete") || "Mark as Complete"
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div
                      className="prose prose-green max-w-none"
                      dangerouslySetInnerHTML={{ __html: currentContent.content || "" }}
                    />
                    <div className="text-center pt-6 border-t">
                      <Button
                        onClick={handleContentComplete}
                        disabled={currentContent.completed}
                        className="flex items-center gap-2"
                      >
                        {currentContent.completed ? (
                          <>
                            <FaCheck size={14} />
                            {t("completed") || "Completed"}
                          </>
                        ) : (
                          t("markAsComplete") || "Mark as Complete"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentContentIndex === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <FaArrowLeft size={14} />
                {t("previous") || "Previous"}
              </Button>

              <Button
                onClick={handleNext}
                disabled={currentContentIndex === course.contents.length - 1}
                className="flex items-center gap-2"
              >
                {t("next") || "Next"}
                <FaArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
