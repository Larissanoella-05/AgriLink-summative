"use client"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const LandingCarousel = () => {
  const { t } = useTranslation()
  const slides = [
    {
      image: "/Images/carousel/1.jpg",
      text: t("phrase1"),
    },
    {
      image: "/Images/carousel/7.jpg",
      text: t("phrase2"),
    },
    {
      image: "/Images/carousel/3.jpg",
      text: t("phrase3"),
    },
    {
      image: "/Images/carousel/4.jpg",
      text: t("phrase4"),
    },
    {
      image: "/Images/carousel/5.jpg",
      text: t("phrase5"),
    },
    {
      image: "/Images/carousel/6.jpg",
      text: t("phrase6"),
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="mt-[50px] bg-green-600 pb-7 pt-5 dark:bg-green-800">
      <div className="mx-auto w-[95%]">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="relative rounded-2xl px-2 py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={`Slide ${index}`}
                  className="h-[550px] w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-[20px] left-5 right-5 bg-[#00000088] px-2 py-2 text-center">
                <h2 className="text-lg font-bold text-white md:text-xl">{slide.text}</h2>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default LandingCarousel
