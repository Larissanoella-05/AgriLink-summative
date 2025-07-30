import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addToCart, getCartItemsByFarmer, getUserCart, removeFromCart } from "@/services/apiCart"
import toast from "react-hot-toast"

export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cropId, userId, quantity }: { cropId: number; userId: string; quantity?: number }) =>
      addToCart(cropId, userId, quantity),
    onSuccess: () => {
      toast.success("Item added to cart successfully!")
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      queryClient.invalidateQueries({ queryKey: ["farmerCartItems"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add item to cart")
    },
  })
}

export function useFarmerCartItems(farmerId: string) {
  return useQuery({
    queryKey: ["farmerCartItems", farmerId],
    queryFn: () => getCartItemsByFarmer(farmerId),
    enabled: !!farmerId,
  })
}

export function useUserCart(userId: string) {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getUserCart(userId),
    enabled: !!userId,
  })
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      toast.success("Item removed from cart")
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      queryClient.invalidateQueries({ queryKey: ["farmerCartItems"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove item from cart")
    }
  })
}