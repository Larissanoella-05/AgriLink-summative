"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { FaBook, FaVideo, FaClock, FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa"

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
    const courseId = Number.parseInt(id || "1")
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`)

    const courseData: { [key: number]: Course } = {
      1: {
        id: 1,
        title: "Crop Rotation Fundamentals",
        description: "Learn the basics of crop rotation and its benefits for soil health",
        difficulty: "Beginner",
        totalDuration: "60 min",
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
            type: "article",
            title: "Crop Rotation in Practice",
            content: `
              <h2>Implementing Crop Rotation on Your Farm</h2>
              <p>Successful crop rotation requires careful planning and consistent implementation. Here's how to put theory into practice on your Rwandan farm.</p>
              
              <h3>Starting Your First Rotation</h3>
              <ul>
                <li><strong>Map your fields:</strong> Divide your land into sections for rotation</li>
                <li><strong>Test soil conditions:</strong> Know your starting point</li>
                <li><strong>Choose appropriate crops:</strong> Select varieties suited to your climate and soil</li>
                <li><strong>Plan timing:</strong> Consider planting and harvest seasons</li>
              </ul>

              <h3>Common Rotation Patterns in Rwanda</h3>
              <div style="background: #f0f8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4>2-Year Rotation (Simple)</h4>
                <p><strong>Season A:</strong> Legumes (beans, groundnuts)<br>
                <strong>Season B:</strong> Cereals (maize, sorghum)</p>
              </div>
              
              <div style="background: #f0f8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4>3-Year Rotation (Intermediate)</h4>
                <p><strong>Year 1:</strong> Nitrogen-fixing crops (beans)<br>
                <strong>Year 2:</strong> Heavy feeders (maize, vegetables)<br>
                <strong>Year 3:</strong> Light feeders (root crops)</p>
              </div>

              <h3>Monitoring Success</h3>
              <p>Track these indicators to measure your rotation's effectiveness:</p>
              <ul>
                <li>Soil organic matter levels</li>
                <li>Crop yield improvements</li>
                <li>Reduced pest and disease pressure</li>
                <li>Lower fertilizer requirements</li>
              </ul>

              <h3>Seasonal Considerations for Rwanda</h3>
              <ul>
                <li><strong>Season A (Sept-Jan):</strong> Main rainy season - ideal for maize, beans</li>
                <li><strong>Season B (Feb-May):</strong> Short rains - suitable for vegetables, legumes</li>
                <li><strong>Season C (Jun-Aug):</strong> Dry season - drought-tolerant crops with irrigation</li>
              </ul>
            `,
            duration: "18 min",
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
            type: "article",
            title: "Success Stories and Best Practices",
            content: `
              <h2>Learning from Successful Farmers</h2>
              <p>Real-world examples from Rwandan farmers who have successfully implemented crop rotation systems.</p>
              
              <h3>Case Study 1: Small-Scale Farmer in Musanze</h3>
              <div style="background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                <p><strong>Challenge:</strong> Poor soil fertility and declining yields on 0.5-hectare plot</p>
                <p><strong>Solution:</strong> Implemented 3-year rotation: beans → maize → sweet potatoes</p>
                <p><strong>Results:</strong> 40% increase in yields, reduced fertilizer costs by 30%, improved soil structure</p>
                <p><strong>Key Learning:</strong> Patience and consistent record-keeping were crucial for success</p>
              </div>

              <h3>Case Study 2: Cooperative in Nyagatare</h3>
              <div style="background: #e8f5e8; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                <p><strong>Challenge:</strong> Persistent pest problems in continuous maize cultivation</p>
                <p><strong>Solution:</strong> Diversified 4-crop rotation including sunflowers and sorghum</p>
                <p><strong>Results:</strong> 60% reduction in pest damage, improved soil organic matter, new income streams</p>
                <p><strong>Key Learning:</strong> Diversification provided both pest control and market opportunities</p>
              </div>

              <h3>Key Success Factors</h3>
              <ul>
                <li><strong>Patience:</strong> Benefits may take 2-3 seasons to become apparent</li>
                <li><strong>Record Keeping:</strong> Track yields, costs, and observations for each season</li>
                <li><strong>Community Learning:</strong> Join farmer groups to share experiences and knowledge</li>
                <li><strong>Market Research:</strong> Ensure rotated crops have viable markets</li>
                <li><strong>Gradual Implementation:</strong> Start with small plots before scaling up</li>
              </ul>

              <h3>Common Mistakes to Avoid</h3>
              <ul>
                <li>Rotating crops from the same family (e.g., tomatoes after potatoes)</li>
                <li>Not considering labor requirements for different crops</li>
                <li>Ignoring soil testing results and pH requirements</li>
                <li>Abandoning rotation too early before seeing benefits</li>
                <li>Not planning for storage and marketing of diverse crops</li>
              </ul>

              <h3>Getting Started Checklist</h3>
              <ul>
                <li>□ Test your soil pH and nutrient levels</li>
                <li>□ Map your land and divide into rotation blocks</li>
                <li>□ Research market demand for potential rotation crops</li>
                <li>□ Start with a simple 2-3 crop rotation</li>
                <li>□ Keep detailed records from the first season</li>
                <li>□ Connect with local extension services for support</li>
              </ul>
            `,
            duration: "15 min",
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
            videoUrl: "https://www.youtube.com/embed/DCJw-CoUi7Q",
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
            videoUrl: "https://www.youtube.com/embed/CvP2kMCU_5o",
            duration: "12 min",
            completed: false,
          },
        ],
      },
      3: {
        id: 3,
        title: "Sustainable Pest Control",
        description: "Natural and eco-friendly approaches to pest management",
        difficulty: "Advanced",
        totalDuration: "50 min",
        contents: [
          {
            id: 1,
            type: "article",
            title: "Introduction to Sustainable Pest Control",
            content: `
              <h2>What is Sustainable Pest Control?</h2>
              <p>Sustainable pest control focuses on managing pests using environmentally friendly methods that protect beneficial insects and maintain ecological balance.</p>
              
              <h3>Key Principles</h3>
              <ul>
                <li><strong>Prevention:</strong> Creating conditions unfavorable to pests</li>
                <li><strong>Biological Control:</strong> Using natural predators and parasites</li>
                <li><strong>Cultural Control:</strong> Modifying farming practices</li>
                <li><strong>Minimal Chemical Use:</strong> Using pesticides only when necessary</li>
              </ul>

              <h3>Benefits</h3>
              <ul>
                <li>Protects beneficial insects like bees and butterflies</li>
                <li>Reduces chemical residues in food</li>
                <li>Prevents pest resistance to chemicals</li>
                <li>Cost-effective in the long term</li>
              </ul>
            `,
            duration: "12 min",
            completed: false,
          },
          {
            id: 2,
            type: "video",
            title: "Natural Pest Control Methods",
            videoUrl: "https://www.youtube.com/embed/k_RiNPKJNdE",
            duration: "18 min",
            completed: false,
          },
          {
            id: 3,
            type: "article",
            title: "Companion Planting for Pest Control",
            content: `
              <h2>Using Plants to Control Pests</h2>
              <p>Companion planting involves growing certain plants together to naturally repel pests and attract beneficial insects.</p>

              <h3>Effective Companion Plants</h3>
              <ul>
                <li><strong>Marigolds:</strong> Repel aphids, whiteflies, and nematodes</li>
                <li><strong>Basil:</strong> Deters mosquitoes and flies</li>
                <li><strong>Mint:</strong> Repels ants and rodents</li>
                <li><strong>Garlic:</strong> Natural fungicide and insect repellent</li>
              </ul>

              <h3>Implementation Tips</h3>
              <ul>
                <li>Plant companion plants around crop borders</li>
                <li>Intercrop with pest-repelling plants</li>
                <li>Create habitat for beneficial insects</li>
                <li>Rotate companion plants seasonally</li>
              </ul>
            `,
            duration: "15 min",
            completed: false,
          },
          {
            id: 4,
            type: "video",
            title: "Organic Pesticide Preparation",
            videoUrl: "https://www.youtube.com/embed/bL2Y_JZtopY",
            duration: "10 min",
            completed: false,
          },
        ],
      },
      4: {
        id: 4,
        title: "Water Conservation Methods",
        description: "Efficient irrigation and water management for crops",
        difficulty: "Beginner",
        totalDuration: "40 min",
        contents: [
          {
            id: 1,
            type: "article",
            title: "Water Conservation Basics",
            content: `
              <h2>Why Water Conservation Matters</h2>
              <p>Water is a precious resource, especially in agriculture. Efficient water use ensures sustainable farming and reduces costs.</p>
              
              <h3>Water Conservation Benefits</h3>
              <ul>
                <li>Reduces water bills and operational costs</li>
                <li>Prevents soil erosion and nutrient loss</li>
                <li>Maintains soil structure and health</li>
                <li>Ensures water availability during dry seasons</li>
              </ul>

              <h3>Common Water Waste Sources</h3>
              <ul>
                <li>Over-irrigation and poor timing</li>
                <li>Leaky irrigation systems</li>
                <li>Inappropriate irrigation methods</li>
                <li>Lack of soil moisture monitoring</li>
              </ul>
            `,
            duration: "10 min",
            completed: false,
          },
          {
            id: 2,
            type: "video",
            title: "Drip Irrigation Systems",
            videoUrl: "https://www.youtube.com/embed/79VUAFq2rbg",
            duration: "15 min",
            completed: false,
          },
          {
            id: 3,
            type: "article",
            title: "Rainwater Harvesting",
            content: `
              <h2>Collecting and Storing Rainwater</h2>
              <p>Rainwater harvesting is an excellent way to supplement irrigation water and reduce dependency on other water sources.</p>

              <h3>Simple Harvesting Methods</h3>
              <ul>
                <li><strong>Roof Collection:</strong> Gutters and downspouts to storage tanks</li>
                <li><strong>Surface Runoff:</strong> Directing water from slopes to storage</li>
                <li><strong>Pond Systems:</strong> Creating small ponds for water storage</li>
                <li><strong>Swales:</strong> Landscape features that capture runoff</li>
              </ul>

              <h3>Storage Solutions</h3>
              <ul>
                <li>Plastic tanks for small-scale storage</li>
                <li>Underground cisterns for larger volumes</li>
                <li>Lined ponds for community systems</li>
                <li>Simple barrel systems for home gardens</li>
              </ul>
            `,
            duration: "12 min",
            completed: false,
          },
          {
            id: 4,
            type: "video",
            title: "Mulching for Water Conservation",
            videoUrl: "https://www.youtube.com/embed/AadLCOqalFk",
            duration: "8 min",
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
    updatedContents[currentContentIndex].completed = !updatedContents[currentContentIndex].completed

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
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src={currentContent.videoUrl}
                        title={currentContent.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={handleContentComplete}
                        className="flex items-center gap-2"
                        variant={currentContent.completed ? "outline" : "default"}
                      >
                        {currentContent.completed ? (
                          <>
                            <FaCheck size={14} />
                            {t("markIncomplete") || "Mark as Incomplete"}
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
                    {currentContentIndex === 0 && course.id === 1 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.fao.org/3/i0100e/i0100e02.htm"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              FAO Guide to Crop Rotation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.extension.umn.edu/agriculture/crops/crop-rotation"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              University Extension: Crop Rotation Benefits
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.rodaleinstitute.org/why-organic/organic-farming-practices/crop-rotations/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Rodale Institute: Organic Crop Rotations
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 1 && course.id === 1 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.fao.org/conservation-agriculture/crop-rotation/en/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              FAO: Crop Rotation for Conservation Agriculture
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.sare.org/resources/crop-rotation/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              SARE: Crop Rotation Topic Room
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 2 && course.id === 1 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.extension.iastate.edu/agdm/crops/html/a1-50.html"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Iowa State Extension: Crop Planning and Rotation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.gov.mb.ca/agriculture/crops/soil-management/fag49s00.html"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Manitoba Agriculture: Crop Rotation Planning
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 3 && course.id === 1 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.worldbank.org/en/topic/agriculture/brief/climate-smart-agriculture"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              World Bank: Climate-Smart Agriculture
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.farmers.gov/conservation/crop-rotation"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              USDA: Crop Rotation Practices
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 0 && course.id === 2 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a href="https://www.fao.org/soils/en/" target="_blank" rel="noopener noreferrer">
                              FAO Soils Portal
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/soils/health/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              NRCS Soil Health
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 2 && course.id === 2 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.fao.org/land-water/soil/soil-management-practices/en/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              FAO Soil Management Practices
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.extension.purdue.edu/extmedia/ay/ay-238.html"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Purdue Extension: Improving Garden Soils
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 0 && course.id === 3 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.fao.org/agriculture/crops/thematic-sitemap/theme/pests/ipm/en/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              FAO Integrated Pest Management
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.epa.gov/safepestcontrol/introduction-integrated-pest-management"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              EPA: Introduction to Integrated Pest Management
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 2 && course.id === 3 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.extension.iastate.edu/news/2008/companion.html"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Iowa State Extension: Companion Planting
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.reneesgarden.com/blogs/gardening-tips/companion-planting-guide"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Renee's Garden: Companion Planting Guide
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 0 && course.id === 4 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.fao.org/land-water/water/water-management/en/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              FAO Water Management
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/national/water/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              NRCS Water Resources
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentContentIndex === 2 && course.id === 4 && (
                      <>
                        <h3>Further Reading</h3>
                        <ul>
                          <li>
                            <a
                              href="https://www.epa.gov/watersense/rainwater-harvesting"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              EPA Rainwater Harvesting
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.twdb.texas.gov/conservation/rainwater/index.asp"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Texas Water Development Board: Rainwater Harvesting
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                    <div className="text-center pt-6 border-t">
                      <Button
                        onClick={handleContentComplete}
                        className="flex items-center gap-2"
                        variant={currentContent.completed ? "outline" : "default"}
                      >
                        {currentContent.completed ? (
                          <>
                            <FaCheck size={14} />
                            {t("markIncomplete") || "Mark as Incomplete"}
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
