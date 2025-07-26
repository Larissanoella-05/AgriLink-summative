import type { Crop, Crops } from "@/interfaces"
import supabase, { supabaseUrl } from "./supabase"

export async function getCrops(): Promise<Crops[]> {
  const { data, error } = await supabase.from("crops").select("*, authUsers(*)")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getRecentCrops(): Promise<Crops[]> {
  const { data, error } = await supabase.from("crops").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function insertCrop(crop: Crop) {
  const imageName = typeof crop.image !== "string" && `${Math.random()}-${crop.image.name}`.replace("/", "")

  const { error: uploadError } = await supabase.storage.from("crops").upload(imageName as string, crop.image)
  if (uploadError) {
    throw new Error(`Image upload error: ${uploadError.message}`)
  }

  const { data, error } = await supabase
    .from("crops")
    .insert([
      {
        name: crop.name,
        image: `${supabaseUrl}/storage/v1/object/public/crops/${imageName}`,
        description: crop.description,
        category: crop.category,
        price: crop.price,
        userId: crop.userId,
      },
    ])
    .select()

  if (error) {
    throw new Error(`Crop insert error: ${error.message}`)
  }

  return data
}

export async function updateCrop(id: number, newCol: Crop): Promise<Crop[]> {
  const hasImagePath = typeof newCol.image === "string" && newCol.image?.startsWith?.(supabaseUrl)

  const imageName = typeof newCol.image !== "string" && `${Math.random()}-${newCol.image.name}`
  const imagePath = hasImagePath ? newCol.image : `${supabaseUrl}/storage/v1/object/public/crops/${imageName}`

  const { data, error } = await supabase
    .from("crops")
    .update({
      name: newCol.name,
      image: imagePath,
      description: newCol.description,
      category: newCol.category,
      price: newCol.price,
      userId: newCol.userId,
    })
    .eq("id", id)
    .select()

  if (error) {
    throw new Error(`Crop update error: ${error.message}`)
  }

  if (!data || data.length === 0) {
    throw new Error("No crop record was updated.")
  }

  const updatedCrop = data[0]

  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage.from("crops").upload(imageName as string, newCol.image)

  if (storageError) {
    await supabase.from("crops").delete().eq("id", updatedCrop.id)
    console.error(storageError)
    throw new Error("Crop image could not be uploaded and the crop was not updated")
  }

  return data
}

export async function deleteCrop(id: number) {
  const { data, error } = await supabase.from("crops").delete().eq("id", id)
  if (error) {
    throw new Error(error.message)
  }
  return data
}
