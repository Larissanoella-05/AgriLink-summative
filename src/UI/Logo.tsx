'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Logo() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex items-center space-x-3 group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      >
        <div className="text-4xl filter drop-shadow-lg">🌾</div>
        <motion.div
          className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="flex flex-col">
        <div className="text-2xl font-bold text-white font-display tracking-tight">
          {t('appName')}
        </div>
        <div className="text-xs text-white/80 font-medium tracking-wider uppercase">
          Rwanda Agriculture
        </div>
      </div>
    </motion.div>
  );
}
