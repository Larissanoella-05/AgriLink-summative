import { Art, Arts } from "@/interfaces";
import supabase, { supabaseUrl } from "./supabase";

export async function getArts(): Promise<Arts[]> {
  const { data, error } = await supabase.from("arts").select("*, authUsers(*)");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getRecentArts(): Promise<Arts[]> {
  const { data, error } = await supabase
    .from("arts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function insertArt(art: Art) {
  const imageName =
    typeof art.image !== "string" &&
    `${Math.random()}-${art.image.name}`.replace("/", "");

  const { error: uploadError } = await supabase.storage
    .from("arts")
    .upload(imageName as string, art.image);
  if (uploadError) {
    throw new Error(`Image upload error: ${uploadError.message}`);
  }

  const { data, error } = await supabase
    .from("arts")
    .insert([
      {
        ...art,
        image: `https://fyzypjerwxdljlptouot.supabase.co/storage/v1/object/public/arts/${imageName}`,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Art insert error: ${error.message}`);
  }

  return data;
}

export async function updateArt(id: number, newCol: Art): Promise<Art[]> {
  const hasImagePath =
    typeof newCol.image === "string" && newCol.image?.startsWith?.(supabaseUrl);

  const imageName =
    typeof newCol.image !== "string" && `${Math.random()}-${newCol.image.name}`;
  const imagePath = hasImagePath
    ? newCol.image
    : `${supabaseUrl}/storage/v1/object/public/arts/${imageName}`;

  const { data, error } = await supabase
    .from("arts")
    .update({ ...newCol, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Art update error: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error("No art record was updated.");
  }

  const updatedArt = data[0]; // Access the first element of the array

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("arts")
    .upload(imageName as string, newCol.image);

  // Delete the art if there was an error uploading the image
  if (storageError) {
    await supabase.from("arts").delete().eq("id", updatedArt.id);
    console.error(storageError);
    throw new Error(
      "Art image could not be uploaded and the art was not updated",
    );
  }

  return data;
}

export async function deleteArt(id: number) {
  const { data, error } = await supabase.from("arts").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
