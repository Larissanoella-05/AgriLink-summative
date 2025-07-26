"use client"

import { formatCurrency } from "@/utils/helpers"
import { Card, CardContent } from "@/components/ui/card"
import { PopoverCrop } from "@/UI/Popover"
import type { Crops } from "@/interfaces"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function CropsShow({ crops }: { crops: Crops[] | undefined }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sortBy = searchParams.get("sortBy") || "date-desc"

  const modifier = sortBy === "date-desc" ? -1 : 1

  const sortedCrops = crops?.sort(
    (a, b) => (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * modifier,
  )

  return (
    <div className="grid grid-cols-3 gap-6">
      {sortedCrops?.map((crop, index) => (
        <div key={index} className="item">
          <div className="group relative h-full transition-all duration-300 hover:translate-y-[-5px]">
            <Card className="mx-2 h-full transform transition-all duration-300 bg-card">
              <CardContent className="flex flex-col p-0">
                <div
                  className="relative cursor-pointer"
                  onClick={() => navigate(`/account/manageCrops/crop/${crop.id}`)}
                >
                  <img
                    src={crop.image || "/placeholder.svg"}
                    alt={crop.name}
                    className="h-[400px] w-full rounded object-cover transition-all duration-300"
                  />
                </div>
                <div className="text-right">
                  <PopoverCrop id={crop.id}></PopoverCrop>
                </div>
                <div className="p-2 text-center">
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
