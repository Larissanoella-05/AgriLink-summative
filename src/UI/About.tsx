"use client"

import { motion } from "framer-motion"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useTranslation } from "react-i18next"

const AgricultureHero = () => {
  const { i18n } = useTranslation()
  const isKinyarwanda = i18n.language === 'rw'

  const slides = [
    {
      image: "/Images/carousel/1.jpg",
      text: isKinyarwanda ? "Ibihingwa bishya byakuze hafi yawe" : "Fresh crops grown near you",
      accent: isKinyarwanda ? "Bishya & Byaho" : "Fresh & Local",
    },
    {
      image: "/Images/carousel/2.jpg",
      text: isKinyarwanda ? "Umuryango ufatanyije mu buhinzi" : "Community-driven agriculture",
      accent: isKinyarwanda ? "Umuryango Ufatanyije" : "Community Driven",
    },
    {
      image: "/Images/carousel/9.jpg",
      text: isKinyarwanda ? "Ejo hazaza harambye mu buhinzi" : "Sustainable farming future",
      accent: isKinyarwanda ? "Ejo hazaza Harambye" : "Sustainable Future",
    },
    {
      image: "/Images/carousel/4.jpg",
      text: isKinyarwanda ? "Ibiciro byangiza ku bahinzi" : "Fair prices for farmers",
      accent: isKinyarwanda ? "Ibiciro Byangiza" : "Fair Prices",
    },
    {
      image: "/Images/carousel/5.jpg",
      text: isKinyarwanda ? "Gukura hamwe nk'umuryango" : "Growing together as community",
      accent: isKinyarwanda ? "Gukura Hamwe" : "Growing Together",
    },
    {
      image: "/Images/carousel/6.jpg",
      text: isKinyarwanda ? "Kuva mu murima kugeza ku meeza" : "From farm to your table",
      accent: isKinyarwanda ? "Kuva mu Murima kugeza ku Meeza" : "Farm to Table",
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    customPaging: () => (
      <div className="w-4 h-4 bg-white/40 rounded-full hover:bg-white transition-all duration-300 shadow-soft"></div>
    ),
    dotsClass: "slick-dots !bottom-8 !flex !justify-center !gap-3",
  }

  return (
    <section className="relative overflow-hidden">
      {}
      <div className="hero-gradient py-20">
        {}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 relative">
          {}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-display">
              {isKinyarwanda ? "Isoko ry'Ubuhinzi" : "Rwanda's Agricultural"}
              <span className="block text-yellow-300">{isKinyarwanda ? "rya Rwanda" : "Marketplace"}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {isKinyarwanda 
                ? "Guhuza abahinzi n'abaguzi, guteza imbere ubuhinzi burambye, no kubaka umuryango ukomeye mu Rwanda."
                : "Connecting farmers with buyers, fostering sustainable agriculture, and building stronger communities across Rwanda."
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="px-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative group overflow-hidden rounded-3xl shadow-soft-lg hover:shadow-glow-lg transition-all duration-500">
                    <motion.img
                      src={slide.image || "/placeholder.svg?height=400&width=350&query=agriculture"}
                      alt={`${slide.accent} - ${index + 1}`}
                      className="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.05 }}
                    />

                    {}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="glass-effect rounded-2xl p-6 backdrop-blur-md border border-white/20">
                        <motion.div
                          className="inline-block px-3 py-1 bg-yellow-400 text-green-800 rounded-full text-sm font-semibold mb-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          {slide.accent}
                        </motion.div>

                        <h3 className="text-xl font-bold text-white font-display leading-tight mb-2">{slide.text}</h3>

                        <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></div>
                      </div>
                    </motion.div>

                    {}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AgricultureHero
