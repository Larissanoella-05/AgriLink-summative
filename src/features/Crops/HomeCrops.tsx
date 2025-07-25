'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCrops } from './useCrops';
import { formatCurrency } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaInfo, FaArrowRight, FaStar } from 'react-icons/fa';

export default function HomeCrops() {
  const navigate = useNavigate();
  const { crops } = useCrops();
  const cropsShow = crops?.slice(0, 9);
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-20 w-48 h-48 bg-yellow-500/5 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '1.5s' }}
      ></div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 font-semibold mb-6">
              <FaStar className="text-yellow-500" />
              Premium Quality Crops
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-display">
              <span className="gradient-text">{t('featuredCrops')}</span>
            </h2>

            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500 mx-auto rounded-full shadow-glow"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Discover fresh, locally-grown produce from Rwanda's finest farmers.
            Quality guaranteed, community supported.
          </motion.p>
        </motion.div>

        {cropsShow && cropsShow.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Carousel className="relative w-full">
              <CarouselContent className="flex gap-6 px-4">
                {cropsShow.map((crop, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      className="group h-full"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -12 }}
                    >
                      <Card className="card-hover h-full overflow-hidden rounded-3xl shadow-soft hover:shadow-glow-lg transition-all duration-500 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                        <CardContent className="p-0 h-full flex flex-col">
                          <div
                            className="relative cursor-pointer overflow-hidden"
                            onClick={() => navigate(`/crop/${crop.id}`)}
                          >
                            <motion.img
                              src={
                                crop.image ||
                                '/placeholder.svg?height=300&width=400&query=crop'
                              }
                              alt={crop.name}
                              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              whileHover={{ scale: 1.05 }}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Hover button */}
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                            >
                              <button className="btn-glow flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-glow hover:shadow-glow-lg transition-all duration-300">
                                <FaInfo className="text-sm" />
                                {t('cropDetails')}
                              </button>
                            </motion.div>

                            {/* Quality badge */}
                            <div className="absolute top-4 left-4">
                              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-green-800 rounded-full text-sm font-bold shadow-soft">
                                <FaStar size={12} />
                                Premium
                              </div>
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                              <h3 className="font-bold text-foreground text-xl font-display group-hover:gradient-text transition-all duration-300">
                                {crop.name}
                              </h3>

                              <div className="flex items-center justify-between">
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  {formatCurrency(crop.price)}
                                </p>

                                <div className="flex items-center gap-1 text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={14} />
                                  ))}
                                </div>
                              </div>

                              <div className="text-sm text-muted-foreground">
                                Fresh • Local • Organic
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-4 h-14 w-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-glow hover:shadow-glow-lg border-0 transition-all duration-300" />
              <CarouselNext className="absolute right-4 h-14 w-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-glow hover:shadow-glow-lg border-0 transition-all duration-300" />
            </Carousel>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">🌱</div>
            <p className="text-xl text-muted-foreground">{t('homeNoCrops')}</p>
          </motion.div>
        )}

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigate('/products')}
            className="btn-glow group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 px-10 py-4 font-bold text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span>{t('viewMoreCrops')}</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
