"use client"

import { Input } from "../../components/ui/input"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ProductsSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function ProductsSearch({ searchQuery, onSearchChange }: ProductsSearchProps) {
  const { t } = useTranslation()

  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={t("searchProducts") || "Search products..."}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 h-12 text-base"
      />
    </div>
  )
}