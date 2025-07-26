'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HoverCardDemo } from './HoverCard';
import { scroller, Link as ScrollerLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = (section: string) => {
    if (location.pathname === '/home') {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -80,
      });
    } else {
      window.scrollTo(0, 0);
      navigate(`/home#${section}`);
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -80,
        });
      }, 100);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { key: 'navHome', to: 'home', type: 'scroll' },
    { key: 'navAbout', to: 'about', type: 'scroll' },
    { key: 'navProducts', to: '/products', type: 'link', hasDropdown: true },
    { key: 'navEducation', to: '/education', type: 'link' },
    { key: 'navContact', to: 'contact', type: 'scroll' },
  ];

  return (
    <motion.ul
      className="flex items-center gap-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {navItems.map((item, index) => (
        <motion.li
          key={item.key}
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onMouseEnter={() => item.hasDropdown && setIsHovered(true)}
          onMouseLeave={() => item.hasDropdown && setIsHovered(false)}
        >
          {item.hasDropdown ? (
            <HoverCardDemo>
              <NavLink
                className="relative flex items-center font-medium text-white transition-all duration-300 hover:text-accent group"
                to={item.to}
              >
                <span className="relative">
                  {t(item.key)}
                  <span className="absolute left-0 top-6 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </span>
                <motion.div
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isHovered ? (
                    <RiArrowDropUpLine className="ml-1" size={20} />
                  ) : (
                    <RiArrowDropDownLine className="ml-1" size={20} />
                  )}
                </motion.div>
              </NavLink>
            </HoverCardDemo>
          ) : item.type === 'scroll' ? (
            <ScrollerLink
              to={item.to}
              spy={true}
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => handleNavigation(item.to)}
              className="block cursor-pointer font-medium text-white transition-all duration-300 hover:text-accent group"
            >
              <span className="relative">
                {t(item.key)}
                <span className="absolute left-0 top-6 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </span>
            </ScrollerLink>
          ) : (
            <NavLink
              to={item.to}
              className="block cursor-pointer font-medium text-white transition-all duration-300 hover:text-accent group"
            >
              <span className="relative">
                {t(item.key)}
                <span className="absolute left-0 top-6 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </span>
            </NavLink>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}
