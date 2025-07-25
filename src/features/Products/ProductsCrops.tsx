"use client"

import { formatCurrency } from "@/utils/helpers"
import { useCrops } from "../Crops/useCrops"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FaInfo } from "react-icons/fa"

export default function ProductsCrops() {
  const navigate = useNavigate()
  const { crops } = useCrops()
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category") || "all"
  const sortOption = searchParams.get("sortBy") || "date-asc"

  const filteredCrops = category === "all" ? crops : crops?.filter((crop) => crop.category === category)

  const field = sortOption.split("-")[0]
  const value = sortOption.split("-")[1]

  const modifier = value === "asc" ? 1 : -1
  const fieldColumn = field === "price" ? "price" : "created_at"

  const sortedCrops = filteredCrops?.sort((a, b) => {
    if (fieldColumn === "created_at") {
      return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * modifier
    }
    return (a.price - b.price) * modifier
  })

  return (
    <div className="grid grid-cols-3 gap-6">
      {sortedCrops?.map((crop, index) => (
        <div key={index} className="item">
          <div className="group relative h-full">
            <Card className="h-full transform transition-all duration-300 bg-card">
              <CardContent className="flex flex-col p-0">
                <div className="relative cursor-pointer" onClick={() => navigate(`/crop/${crop.id}`)}>
                  <img
                    src={crop.image || "/placeholder.svg"}
                    alt={crop.name}
                    className="h-[400px] w-full rounded object-cover transition-all duration-300"
                  />

                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-green-600">
                      <FaInfo /> Crop Details
                    </button>
                  </div>
                </div>
                <div className="mt-2 p-2 text-center">
                  <p className="font-poppins text-base font-medium text-foreground">{crop.name}</p>
                  <p className="mt-1 font-poppins text-sm text-muted-foreground">{formatCurrency(crop.price)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}
