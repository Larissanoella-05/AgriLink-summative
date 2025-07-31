

export interface LocalOrder {
  id: string
  cropId: number
  cropName: string
  farmerId: string
  farmerName: string
  farmerEmail: string
  buyerName: string
  buyerPhone: string
  quantity: number
  price: number
  total: number
  timestamp: string
  status: 'pending' | 'completed'
}

export interface LocalReview {
  id: string
  cropId: number
  cropName: string
  farmerId: string
  name: string
  email: string
  comment: string
  rate: number
  timestamp: string
}


export const saveOrderToLocalStorage = (order: Omit<LocalOrder, 'id' | 'timestamp'>) => {
  const orders = getOrdersFromLocalStorage()
  const newOrder: LocalOrder = {
    ...order,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  }
  orders.push(newOrder)
  localStorage.setItem('agrilink_orders', JSON.stringify(orders))
  return newOrder
}

export const getOrdersFromLocalStorage = (): LocalOrder[] => {
  const orders = localStorage.getItem('agrilink_orders')
  return orders ? JSON.parse(orders) : []
}

export const getOrdersByFarmerId = (farmerId: string): LocalOrder[] => {
  const orders = getOrdersFromLocalStorage()
  return orders.filter(order => order.farmerId === farmerId)
}


export const saveReviewToLocalStorage = (review: Omit<LocalReview, 'id' | 'timestamp'>) => {
  const reviews = getReviewsFromLocalStorage()
  const newReview: LocalReview = {
    ...review,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  }
  reviews.push(newReview)
  localStorage.setItem('agrilink_reviews', JSON.stringify(reviews))
  return newReview
}

export const getReviewsFromLocalStorage = (): LocalReview[] => {
  const reviews = localStorage.getItem('agrilink_reviews')
  return reviews ? JSON.parse(reviews) : []
}

export const getReviewsByFarmerId = (farmerId: string): LocalReview[] => {
  const reviews = getReviewsFromLocalStorage()
  return reviews.filter(review => review.farmerId === farmerId)
}


export const updateOrderStatus = (orderId: string, status: 'pending' | 'completed') => {
  const orders = getOrdersFromLocalStorage()
  const updatedOrders = orders.map(order => 
    order.id === orderId ? { ...order, status } : order
  )
  localStorage.setItem('agrilink_orders', JSON.stringify(updatedOrders))
}