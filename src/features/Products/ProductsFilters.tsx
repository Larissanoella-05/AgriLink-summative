"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label, Separator } from "../../components/ui"
import { X, Filter } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ProductsFiltersProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  priceRange: { min: string; max: string }
  onPriceRangeChange: (range: { min: string; max: string }) => void
}

const categories = [
  { id: "vegetables", name: "Vegetables", icon: "🥕" },
  { id: "fruits", name: "Fruits", icon: "🍎" },
  { id: "grains", name: "Grains", icon: "🌾" },
  { id: "herbs", name: "Herbs", icon: "🌿" },
  { id: "dairy", name: "Dairy", icon: "🥛" },
  { id: "meat", name: "Meat", icon: "🥩" },
  { id: "organic", name: "Organic", icon: "🌱" },
  { id: "seeds", name: "Seeds", icon: "🌰" },
]

export default function ProductsFilters({
  selectedCategories,
  onCategoriesChange,
  priceRange,
  onPriceRangeChange,
}: ProductsFiltersProps) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter((id) => id !== categoryId))
    } else {
      onCategoriesChange([...selectedCategories, categoryId])
    }
  }

  const handleClearAll = () => {
    onCategoriesChange([])
    onPriceRangeChange({ min: "", max: "" })
  }

  const hasActiveFilters = selectedCategories.length > 0 || priceRange.min || priceRange.max

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            {t("filters") || "Filters"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 p-0">
            {isExpanded ? "−" : "+"}
          </Button>
        </div>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={handleClearAll} className="mt-2 h-8 text-xs bg-transparent">
            <X className="mr-1 h-3 w-3" />
            {t("clearAll") || "Clear All"}
          </Button>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">{t("categories") || "Categories"}</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(category.id)}
                  className="justify-start h-9 text-xs"
                >
                  <span className="mr-2">{category.icon}</span>
                  {t(category.id) || category.name}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">{t("priceRange") || "Price Range"}</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                  {t("min") || "Min"}
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                  {t("max") || "Max"}
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="1000"
                  value={priceRange.max}
                  onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {selectedCategories.length > 0 && (
            <>
              <Separator />
              <div>
                <Label className="text-sm font-medium mb-2 block">{t("activeFilters") || "Active Filters"}</Label>
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map((categoryId) => {
                    const category = categories.find((c) => c.id === categoryId)
                    return (
                      <Badge key={categoryId} variant="secondary" className="text-xs px-2 py-1">
                        {category?.icon} {t(categoryId) || category?.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCategoryToggle(categoryId)}
                          className="ml-1 h-3 w-3 p-0 hover:bg-transparent"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  )
}
