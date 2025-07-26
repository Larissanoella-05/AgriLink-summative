import type { Review } from "@/interfaces"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Stars from "@/UI/Stars"
import { formatShortDate } from "@/utils/helpers"
import { useTranslation } from "react-i18next"

export default function ReviewShow({ reviews }: { reviews: Review[] }) {
  const { t } = useTranslation()
  if (reviews.length === 0) {
    return (
      <div className="w-[550px] py-6 text-center">
        <h2 className="text-base font-medium text-muted-foreground">{t("noReview")}</h2>
      </div>
    )
  }

  return (
    <div className={reviews.length === 1 ? "relative" : "relative px-4"}>
      <h2 className="text-center text-lg font-medium text-foreground">{t("reviewTitle")}</h2>
      <Carousel className="max-w-[550px]">
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center gap-2">
                        <img
                          className="h-[50px] w-[50px] rounded-full"
                          src="/Images/default-user.jpg"
                          alt="commentor"
                        ></img>
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.email}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex items-center gap-2">
                        <Stars rating={review.rate} color="#10b981" size={20} />
                        <span className="text-sm text-muted-foreground">
                          {formatShortDate(new Date(review.created_at))}
                        </span>
                      </div>
                      <p className="ml-2 text-base text-foreground">{review.comment}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {reviews.length !== 1 && (
          <>
            <CarouselPrevious className="absolute left-[-30px] flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 hover:text-white" />
            <CarouselNext className="absolute right-[-30px] flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 hover:text-white" />
          </>
        )}
      </Carousel>
    </div>
  )
}
