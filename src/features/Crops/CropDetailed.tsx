"use client"

import { useParams } from "react-router-dom"
import { useCrops } from "./useCrops"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/utils/helpers"
import { LeaveReview } from "./LeaveReview"
import { useReviews } from "../Reviews/useReviews"
import Stars from "@/UI/Stars"
import ReviewShow from "./ReviewShow"
import { useTranslation } from "react-i18next"

export function CropDetailed() {
  const { t } = useTranslation()
  const { reviews } = useReviews()
  const { id } = useParams()
  const { crops } = useCrops()
  const cropShow = crops?.find((crop) => crop.id === Number(id))
  const Author = cropShow?.authUsers?.firstName + " " + cropShow?.authUsers?.lastName

  const email = cropShow?.authUsers?.email
  const avatar = cropShow?.authUsers?.avatar
  const cropReviews = reviews?.filter((review) => review.cropId === Number(id)) || []
  const rateAverage = cropReviews?.length
    ? cropReviews.reduce((acc, elem) => acc + (elem.rate || 0), 0) / cropReviews.length
    : 0

  return (
    <div className="mx-[20vw] mt-10 grid grid-cols-[500px_1fr] gap-[80px] bg-background">
      <Card className="h-[600px] bg-card">
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

        <div className="flex items-center gap-4">
          <img
            className="h-[40px] w-[40px] rounded-full"
            src={avatar ? avatar : "/Images/default-user.jpg"}
            alt="farmer"
          ></img>

          <div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{t("farmerNames")}</span> {Author}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{t("farmerEmail")}</span> {email}
            </p>
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
          <a
            href={`mailto:${cropShow?.authUsers?.email}`}
            className="flex w-full items-center justify-center gap-1 rounded-md bg-green-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-green-600"
          >
            {t("chatWithFarmer")}
          </a>
          <LeaveReview id={Number(id)}></LeaveReview>
        </div>
        <div>
          <ReviewShow reviews={cropReviews}></ReviewShow>
        </div>
      </div>
    </div>
  )
}
