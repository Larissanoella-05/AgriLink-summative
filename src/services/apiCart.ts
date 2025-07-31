import type { CartItem } from "@/interfaces"
import supabase from "./supabase"

export async function addToCart(cropId: number, userId: string, quantity: number = 1): Promise<CartItem> {
  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart")
    .select("*")
    .eq("crop_id", cropId)
    .eq("user_id", userId)
    .single()

  if (existingItem) {
    // Update quantity if item exists
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
      .select("*")
      .single()

    if (error) throw new Error(error.message)
    return data
  } else {
    // Add new item to cart
    const { data, error } = await supabase
      .from("cart")
      .insert([{ crop_id: cropId, user_id: userId, quantity }])
      .select("*")
      .single()

    if (error) throw new Error(error.message)
    return data
  }
}

export async function getCartItemsByFarmer(farmerId: string): Promise<CartItem[]> {
  console.log("Looking for farmer ID:", farmerId)
  
  // Get farmer's authUsers record to find the correct ID
  const { data: authUser } = await supabase
    .from("authUsers")
    .select("id, authUserId")
    .eq("authUserId", farmerId)
    .single()
  
  console.log("Auth user found:", authUser)
  
  // Try to find crops using both possible ID formats
  const { data: farmerCrops, error: cropsError } = await supabase
    .from("crops")
    .select("id, userId")
    .or(`userId.eq.${farmerId},userId.eq.${authUser?.id || 'none'}`)

  console.log("Farmer crops found:", farmerCrops)
  
  if (cropsError) {
    console.error("Crops error:", cropsError)
    throw new Error(cropsError.message)
  }
  if (!farmerCrops || farmerCrops.length === 0) return []

  const cropIds = farmerCrops.map(crop => crop.id)
  console.log("Crop IDs:", cropIds)

  // Then get cart items for those crops
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .in("crop_id", cropIds)

  console.log("Cart items found:", data)
  
  if (error) {
    console.error("Cart error:", error)
    throw new Error(error.message)
  }
  return data || []
}

export async function getUserCart(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)

  if (error) throw new Error(error.message)
  return data || []
}

export async function removeFromCart(cartItemId: number): Promise<void> {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("id", cartItemId)

  if (error) throw new Error(error.message)
}