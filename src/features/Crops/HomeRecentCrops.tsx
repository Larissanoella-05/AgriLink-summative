"use client"

import { formatCurrency } from "@/utils/helpers"
import { useRecentCrops } from "./useRecentCrops"
import { Card, CardContent } from "@/components/ui/card"
import Slider from "react-slick"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaInfo } from "react-icons/fa"

const HomeRecentCrops = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { crops } = useRecentCrops()
  const cropsShow = crops?.slice(0, 9)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <div className="mb-[200px] mt-[100px] h-[500px] px-[19vw] bg-background">
      <h2 className="mb-[90px] text-center font-playfair text-4xl font-extrabold text-foreground">
        {t("latestCrops")}
      </h2>
      <Slider {...settings}>
        {cropsShow?.map((crop, index) => (
          <div key={index} className="item">
            <div className="group relative h-full">
              <Card
                className="mx-2 h-full transform transition-all duration-300 cursor-pointer bg-card"
                onClick={() => navigate(`/crop/${crop.id}`)}
              >
                <CardContent className="flex flex-col p-0">
                  <div className="relative">
                    <img
                      src={crop.image || "/placeholder.svg"}
                      alt={crop.name}
                      className="h-[400px] w-full rounded object-cover transition-all duration-300"
                    />

                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-green-600">
                        <FaInfo />
                        {t("cropDetails")}
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
      </Slider>
    </div>
  )
}

export default HomeRecentCrops
