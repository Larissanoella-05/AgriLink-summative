"use client"

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Eye, MapPin, User, Calendar, Plus, Minus } from "lucide-react"
import { useCrops } from "../Crops/useCrops"
import { formatCurrency } from "../../utils/helpers"
import type { Crops } from "../../interfaces"
import toast from "react-hot-toast"
import FarmerContact from "../Crops/FarmerContact"
import { saveOrderToLocalStorage } from "../../utils/localStorage"


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

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [showContactModal, setShowContactModal] = useState<{ [key: number]: boolean }>({})
  const [showOrderModal, setShowOrderModal] = useState<{ [key: number]: boolean }>({})
  const [orderForm, setOrderForm] = useState({ name: '', phone: '' })

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
      if (priceRange.min && crop.price < Number.parseFloat(priceRange.min)) return false
      if (priceRange.max && crop.price > Number.parseFloat(priceRange.max)) return false

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

  const handleQuantityChange = (cropId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [cropId]: Math.max(1, (prev[cropId] || 1) + change),
    }))
  }



  const handleOrderSubmit = (crop: Crops) => {
    if (!orderForm.name || !orderForm.phone) {
      toast.error('Please fill in all fields')
      return
    }

    const quantity = quantities[crop.id] || 1
    const total = crop.price * quantity

    // Save order to local storage
    saveOrderToLocalStorage({
      cropId: crop.id,
      cropName: crop.name,
      farmerId: crop.authUsers?.id || '',
      farmerName: `${crop.authUsers?.firstName || ''} ${crop.authUsers?.lastName || ''}`.trim(),
      farmerEmail: crop.authUsers?.email || '',
      buyerName: orderForm.name,
      buyerPhone: orderForm.phone,
      quantity,
      price: crop.price,
      total,
      status: 'pending' as const
    })

    toast.success('Order placed successfully!')
    setShowOrderModal((prev) => ({ ...prev, [crop.id]: false }))
    setOrderForm({ name: '', phone: '' })
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCrops.map((crop: Crops) => (
          <Card
            key={crop.id}
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={crop.image || "/placeholder.svg?height=200&width=300&query=crop"}
                alt={crop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=300"
                }}
              />
              <div className="absolute top-4 right-4">
                {crop.category && <Badge className="bg-green-500 text-white shadow-lg">{crop.category}</Badge>}
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-xl group-hover:text-green-600 transition-colors">{crop.name}</h3>
                {crop.description && <p className="text-sm text-muted-foreground line-clamp-2">{crop.description}</p>}
              </div>

              <div className="space-y-2">
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
                <div className="text-2xl font-bold text-green-600">{formatCurrency(crop.price)}</div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                  onClick={() => navigate(`/crop/${crop.id}`)}
                >
                  <Eye className="h-4 w-4" />
                  {t("viewDetails") || "View Details"}
                </Button>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-transparent"
                    onClick={() => handleQuantityChange(crop.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantities[crop.id] || 1}
                    onChange={(e) =>
                      setQuantities((prev) => ({ ...prev, [crop.id]: Number.parseInt(e.target.value) || 1 }))
                    }
                    className="w-16 h-8 text-center"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-transparent"
                    onClick={() => handleQuantityChange(crop.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => setShowOrderModal((prev) => ({ ...prev, [crop.id]: true }))}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Order Now
                </Button>
                <Button 
                  onClick={() => setShowContactModal((prev) => ({ ...prev, [crop.id]: true }))}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs"
                >
                  Contact Farmer
                </Button>
              </div>

              {/* Total Price Display */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                <p className="text-sm text-green-600 dark:text-green-400">Total Price</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                  {formatCurrency(crop.price * (quantities[crop.id] || 1))}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Modals */}
      {Object.entries(showOrderModal).map(([cropId, show]) => {
        if (!show) return null
        const crop = filteredAndSortedCrops.find((c) => c.id === Number.parseInt(cropId))
        if (!crop) return null

        return (
          <div
            key={`order-${cropId}`}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrderModal((prev) => ({ ...prev, [Number.parseInt(cropId)]: false }))}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Place Order</h3>
                <p className="text-sm text-muted-foreground">{crop.name} - {formatCurrency(crop.price * (quantities[crop.id] || 1))}</p>
              </div>
              <div className="p-4 space-y-4">
                <Input
                  placeholder="Your Name"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Phone Number"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="p-4 border-t flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowOrderModal((prev) => ({ ...prev, [Number.parseInt(cropId)]: false }))}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleOrderSubmit(crop)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  Submit Order
                </Button>
              </div>
            </div>
          </div>
        )
      })}

      {/* Contact Modals */}
      {Object.entries(showContactModal).map(([cropId, show]) => {
        if (!show) return null
        const crop = filteredAndSortedCrops.find((c) => c.id === Number.parseInt(cropId))
        if (!crop) return null

        return (
          <div
            key={`contact-${cropId}`}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactModal((prev) => ({ ...prev, [Number.parseInt(cropId)]: false }))}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Contact Farmer</h3>
                <p className="text-sm text-muted-foreground">Get in touch for more details</p>
              </div>
              <div className="p-4">
                <FarmerContact farmer={crop.authUsers || null} location={crop.location} />
              </div>
              <div className="p-4 border-t">
                <Button
                  onClick={() => setShowContactModal((prev) => ({ ...prev, [Number.parseInt(cropId)]: false }))}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
