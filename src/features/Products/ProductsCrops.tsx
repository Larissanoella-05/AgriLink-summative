"use client"

import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Eye, MapPin, User, Calendar } from "lucide-react"
import { useCrops } from "../Crops/useCrops"
import { formatCurrency } from "../../utils/helpers"
import type { Crops } from "../../interfaces"

interface ProductsCropsProps {
  searchQuery: string
  selectedCategories: string[]
  sortBy: string
  priceRange: { min: string; max: string }
}

export default function ProductsCrops({ searchQuery, selectedCategories, sortBy, priceRange }: ProductsCropsProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { crops, isLoading, error } = useCrops()

  const filteredAndSortedCrops = useMemo(() => {
    if (!crops) return []

    const filtered = crops.filter((crop: Crops) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          crop.name.toLowerCase().includes(query) ||
          crop.description?.toLowerCase().includes(query) ||
          crop.category?.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategories.length > 0) {
        if (!crop.category || !selectedCategories.includes(crop.category.toLowerCase())) {
          return false
        }
      }

      // Price range filter
      if (priceRange.min && crop.price < parseFloat(priceRange.min)) return false
      if (priceRange.max && crop.price > parseFloat(priceRange.max)) return false

      return true
    })

    // Sort the filtered results
    filtered.sort((a: Crops, b: Crops) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return filtered
  }, [crops, searchQuery, selectedCategories, sortBy, priceRange])

  const formatDistanceToNow = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return t("today") || "Today"
    if (diffInDays === 1) return t("yesterday") || "Yesterday"
    if (diffInDays < 7) return `${diffInDays} ${t("daysAgo") || "days ago"}`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} ${t("weeksAgo") || "weeks ago"}`
    return `${Math.floor(diffInDays / 30)} ${t("monthsAgo") || "months ago"}`
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-video bg-muted rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded mb-4 w-2/3" />
              <div className="h-6 bg-muted rounded w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-semibold mb-2">{t("errorLoading") || "Error Loading Products"}</h3>
        <p className="text-muted-foreground mb-4">
          {t("errorMessage") || "Something went wrong while loading the products. Please try again."}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          {t("retry") || "Retry"}
        </Button>
      </div>
    )
  }

  if (filteredAndSortedCrops.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌾</div>
        <h3 className="text-2xl font-semibold mb-2">{t("noProductsFound") || "No products found"}</h3>
        <p className="text-muted-foreground mb-4">
          {t("noProductsMessage") || "Try adjusting your search or filters to find what you're looking for."}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          {t("clearFilters") || "Clear Filters"}
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAndSortedCrops.map((crop: Crops) => (
        <Card
          key={crop.id}
          className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={() => navigate(`/crop/${crop.id}`)}
        >
          <div className="aspect-video overflow-hidden">
            <img
              src={crop.image || "/placeholder.svg?height=200&width=300&query=crop"}
              alt={crop.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=200&width=300"
              }}
            />
          </div>

          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{crop.name}</h3>
              {crop.category && (
                <Badge variant="secondary" className="text-xs">
                  {crop.category}
                </Badge>
              )}
            </div>

            {crop.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{crop.description}</p>}

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>
                  {crop.authUsers?.firstName} {crop.authUsers?.lastName}
                </span>
              </div>

              {crop.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{crop.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(crop.created_at)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">{formatCurrency(crop.price)}</div>

              <Button size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                {t("viewDetails") || "View Details"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
