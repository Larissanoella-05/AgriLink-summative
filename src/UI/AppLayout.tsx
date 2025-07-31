'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useUser from '@/features/Authentication/useUser';
import { useCrops } from '@/features/Crops/useCrops';
import { useRecentCrops } from '@/features/Crops/useRecentCrops';

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="animate-pulse">
      {}
      <div className="h-16 bg-muted rounded-none"></div>

      {}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="h-8 bg-muted rounded-2xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-muted rounded-2xl"></div>
              <div className="h-4 bg-muted rounded-xl w-3/4"></div>
              <div className="h-4 bg-muted rounded-xl w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function AppLayout() {
  const { isLoading } = useUser();
  const { isLoading: isLoadingCrops } = useCrops();
  const { isLoading: isLoadingRecentCrops } = useRecentCrops();

  const isAppLoading = isLoading || isLoadingCrops || isLoadingRecentCrops;

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {isAppLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Header />
            <main className="pt-16">
              <Outlet />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
