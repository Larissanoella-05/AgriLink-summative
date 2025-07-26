"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { ArrowUpDown, Calendar, DollarSign, SortAsc } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ProductsSortProps {
  sortBy: string
  onSortChange: (value: string) => void
}

const sortOptions = [
  { value: "newest", label: "Newest First", icon: Calendar },
  { value: "oldest", label: "Oldest First", icon: Calendar },
  { value: "price-low", label: "Price: Low to High", icon: DollarSign },
  { value: "price-high", label: "Price: High to Low", icon: DollarSign },
  { value: "name-asc", label: "Name: A to Z", icon: SortAsc },
  { value: "name-desc", label: "Name: Z to A", icon: SortAsc },
]

export default function ProductsSort({ sortBy, onSortChange }: ProductsSortProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowUpDown className="h-4 w-4" />
        <span>{t("sortBy") || "Sort by"}:</span>
      </div>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={t("selectSort") || "Select sorting"} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => {
            const Icon = option.icon
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{t(option.value) || option.label}</span>
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
