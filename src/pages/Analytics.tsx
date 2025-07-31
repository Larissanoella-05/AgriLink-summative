"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Star, ShoppingCart, Heart, MessageCircle } from "lucide-react"
import { formatCurrency } from "@/utils/helpers"
import useUser from "@/features/Authentication/useUser"
import { useState, useEffect } from "react"
import supabase from "@/services/supabase"
import { useReviews } from "@/features/Reviews/useReviews"
import { getOrdersByFarmerId, getReviewsByFarmerId, updateOrderStatus, type LocalOrder, type LocalReview } from "@/utils/localStorage"



export default function Analytics() {
  const { user } = useUser()
  const { reviews } = useReviews()
  const [farmerReviews, setFarmerReviews] = useState<any[]>([])
  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([])
  const [localReviews, setLocalReviews] = useState<LocalReview[]>([])

  // Fetch local storage data
  const fetchLocalData = () => {
    if (!user?.id) return
    
    const orders = getOrdersByFarmerId(user.id)
    const reviews = getReviewsByFarmerId(user.id)
    
    setLocalOrders(orders)
    setLocalReviews(reviews)
  }

  useEffect(() => {
    fetchLocalData()
  }, [user?.id])

  const handleMarkAsDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'completed')
    fetchLocalData() // Refresh data
  }

  // Fetch reviews for farmer's crops
  useEffect(() => {
    const fetchFarmerReviews = async () => {
      if (!user?.id) return
      
      // Get farmer's crops
      const { data: crops } = await supabase
        .from("crops")
        .select("id, name")
        .eq("userId", user.id)
      
      if (!crops) return
      
      // Get reviews for those crops
      const cropIds = crops.map(c => c.id)
      const farmerReviewsData = reviews?.filter(review => 
        cropIds.includes(review.cropId || review.crop_id)
      ) || []
      
      setFarmerReviews(farmerReviewsData)
    }
    
    fetchFarmerReviews()
  }, [user?.id, reviews])



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
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Pending Orders</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{localOrders.filter(order => order.status === 'pending').length}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Completed Orders</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{localOrders.filter(order => order.status === 'completed').length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Reviews</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{localReviews.length + farmerReviews.length}</p>
              </div>
              <Star className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Total Revenue</p>
                <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                  {formatCurrency(localOrders.filter(order => order.status === 'completed').reduce((sum, order) => sum + order.total, 0))}
                </p>
              </div>
              <Heart className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Rating</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {localReviews.length > 0 
                    ? (localReviews.reduce((sum, review) => sum + review.rate, 0) / localReviews.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
          <TabsTrigger value="reviews" className="rounded-xl">
            Customer Reviews
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-xl">
            Order Management
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
              {localReviews.length === 0 && farmerReviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Local Storage Reviews */}
                  {localReviews.map((review) => (
                    <div key={`local-${review.id}`} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{review.cropName}</h4>
                          <p className="text-sm text-muted-foreground">by {review.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rate ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))}
                  
                  {/* Database Reviews */}
                  {farmerReviews.map((review) => (
                    <div key={`db-${review.id}`} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{review.crops?.name || "Product"}</h4>
                          <p className="text-sm text-muted-foreground">by {review.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < (review.rate || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
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
              {localOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {localOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{order.cropName}</h4>
                          <p className="text-sm text-muted-foreground">Ordered by: {order.buyerName}</p>
                          <p className="text-xs text-muted-foreground">Phone: {order.buyerPhone}</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.timestamp).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {order.status}
                          </Badge>
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleMarkAsDelivered(order.id)}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs"
                            >
                              Mark as Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-semibold">{order.quantity} units</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unit Price</p>
                          <p className="font-semibold">{formatCurrency(order.price)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-semibold text-green-600">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  )
}
