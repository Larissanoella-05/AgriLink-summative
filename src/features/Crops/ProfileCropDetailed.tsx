"use client"

import { useParams } from "react-router-dom"
import { useCrops } from "./useCrops"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/utils/helpers"
import { useReviews } from "../Reviews/useReviews"
import Stars from "@/UI/Stars"
import ReviewShow from "./ReviewShow"
import { useTranslation } from "react-i18next"
import DeleteButton from "./DeleteButton"
import { UpdatePersonalCrop } from "./UpdateProfileCrop"

export function ProfileCropDetailed() {
  const { t } = useTranslation()
  const { reviews } = useReviews()
  const { id } = useParams()
  const { crops } = useCrops()
  const cropShow = crops?.find((crop) => crop.id === Number(id))

  const cropReviews = reviews?.filter((review) => review.cropId === Number(id)) || []
  const rateAverage = cropReviews?.length
    ? cropReviews.reduce((acc, elem) => acc + elem.rate, 0) / cropReviews.length
    : 0

  return (
    <div className="mb-[70px] mt-[90px] grid grid-cols-[500px_1fr] gap-[20px] bg-background">
      <Card className="h-[500px] bg-card">
        <CardContent className="h-full p-0">
          <img
            src={cropShow?.image || "/placeholder.svg"}
            alt={cropShow?.name || "Crop"}
            className="h-full w-full rounded object-cover"
          />
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-foreground">{cropShow?.name || "Untitled"}</h2>
          <div className="mt-2 flex items-center space-x-2">
            <Stars rating={rateAverage} color="#10b981" size={24} />
            <span className="text-muted-foreground">({rateAverage.toFixed(1)} / 5)</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-base text-muted-foreground">{cropShow?.description || "No description available."}</p>
          <p className="text-lg font-medium text-foreground">
            {t("cropPrice")}{" "}
            <span className="font-bold text-green-500">{cropShow?.price ? formatCurrency(cropShow.price) : "N/A"}</span>
          </p>
        </div>

        <div className="space-y-4">
          <DeleteButton id={Number(id)}></DeleteButton>
          <UpdatePersonalCrop id={Number(id)}></UpdatePersonalCrop>
        </div>
        <ReviewShow reviews={cropReviews}></ReviewShow>
      </div>
    </div>
  )
}
