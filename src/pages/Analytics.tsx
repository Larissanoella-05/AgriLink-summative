"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Star, ShoppingCart, Heart, MessageCircle } from "lucide-react"
import { formatCurrency } from "@/utils/helpers"

// Mock data - replace with actual API calls
const mockReviews = [
  {
    id: 1,
    cropName: "Organic Tomatoes",
    buyerName: "John Doe",
    rating: 5,
    comment: "Excellent quality tomatoes! Very fresh and tasty.",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    cropName: "Fresh Carrots",
    buyerName: "Jane Smith",
    rating: 4,
    comment: "Good carrots, delivered on time. Will order again.",
    date: "2024-01-12",
    verified: true,
  },
  {
    id: 3,
    cropName: "Green Beans",
    buyerName: "Mike Johnson",
    rating: 5,
    comment: "Perfect beans for cooking. Great farmer!",
    date: "2024-01-10",
    verified: false,
  },
]

const mockOrders = [
  {
    id: 1,
    buyerName: "Alice Brown",
    items: [
      { name: "Organic Tomatoes", quantity: 5, price: 2500 },
      { name: "Fresh Lettuce", quantity: 3, price: 1500 },
    ],
    total: 17000,
    status: "delivered",
    date: "2024-01-14",
    phone: "+250 788 123 456",
  },
  {
    id: 2,
    buyerName: "Bob Wilson",
    items: [{ name: "Carrots", quantity: 10, price: 1200 }],
    total: 12000,
    status: "preparing",
    date: "2024-01-13",
    phone: "+250 788 654 321",
  },
  {
    id: 3,
    buyerName: "Carol Davis",
    items: [{ name: "Green Beans", quantity: 2, price: 3000 }],
    total: 6000,
    status: "pending",
    date: "2024-01-12",
    phone: "+250 788 987 654",
  },
]

const mockCartItems = [
  {
    id: 1,
    cropName: "Organic Tomatoes",
    buyerName: "David Lee",
    quantity: 3,
    price: 2500,
    addedDate: "2024-01-15",
  },
  {
    id: 2,
    cropName: "Fresh Spinach",
    buyerName: "Emma White",
    quantity: 2,
    price: 2000,
    addedDate: "2024-01-14",
  },
]

export default function Analytics() {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "preparing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your sales performance and customer feedback</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Orders</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">24</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Revenue</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(450000)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Avg Rating</p>
                <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">4.7</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Cart Items</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">12</p>
              </div>
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
          <TabsTrigger value="reviews" className="rounded-xl">
            Customer Reviews
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-xl">
            Order Management
          </TabsTrigger>
          <TabsTrigger value="cart" className="rounded-xl">
            Cart Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Customer Reviews & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{review.cropName}</h4>
                        <p className="text-sm text-muted-foreground">by {review.buyerName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        {review.verified && <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Order Management & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">Order #{order.id}</h4>
                        <p className="text-sm text-muted-foreground">Customer: {order.buyerName}</p>
                        <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="text-lg font-bold text-green-600 mt-1">{formatCurrency(order.total)}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Contact Buyer
                        </Button>
                        <Button size="sm" className="text-xs bg-blue-500 hover:bg-blue-600">
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-purple-600" />
                Products Added to Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{item.cropName}</h4>
                        <p className="text-sm text-muted-foreground">Added by: {item.buyerName}</p>
                        <p className="text-xs text-muted-foreground">Added on: {item.addedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Qty: {item.quantity}</p>
                        <p className="text-green-600 font-bold">{formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Cart Insights</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400">Total Items in Carts</p>
                    <p className="font-bold text-blue-800 dark:text-blue-200">12 items</p>
                  </div>
                  <div>
                    <p className="text-blue-600 dark:text-blue-400">Potential Revenue</p>
                    <p className="font-bold text-blue-800 dark:text-blue-200">{formatCurrency(45000)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
