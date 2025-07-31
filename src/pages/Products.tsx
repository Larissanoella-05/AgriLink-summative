"use client"

import { useState } from "react"
import ProductsSearch from "../features/Products/ProductsSearch"
import ProductsFilters from "../features/Products/ProductsFilters"
import ProductsSort from "../features/Products/ProductsSort"
import ProductsCrops from "../features/Products/ProductsCrops"

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <ProductsSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductsFilters
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="mb-6">
              <ProductsSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Products Grid */}
            <ProductsCrops
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              sortBy={sortBy}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
