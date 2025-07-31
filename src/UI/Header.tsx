'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Navbar from './Navbar';
import NavbarActions from './NavbarActions';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-effect shadow-soft-lg backdrop-blur-md border-b border-white/20'
          : 'hero-gradient shadow-glow'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Logo />
        </motion.div>

        <div className="hidden lg:block">
          <Navbar />
        </div>

        <NavbarActions />
      </div>

      {}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </motion.header>
  );
}
