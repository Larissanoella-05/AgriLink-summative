"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Navbar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (section: string) => {
    if (location.pathname === "/home") {
      window.scrollTo(0, 0)
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    } else {
      window.scrollTo(0, 0)
      navigate(`/home#${section}`)
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const navItems = [
    { key: "navHome", to: "home", type: "scroll" },
    { key: "navAbout", to: "about", type: "scroll" },
    { key: "navProducts", to: "/products", type: "link" },
    { key: "navEducation", to: "/education", type: "link" },
    { key: "navContact", to: "contact", type: "scroll" },
  ]

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
        >
          {item.type === "scroll" ? (
            <NavLink
              className="relative flex items-center font-medium text-white transition-all duration-300 hover:text-accent group"
              to={item.to}
              onClick={() => handleNavigation(item.to)}
            >
              <span className="relative">
                {t(item.key)}
                <span className="absolute left-0 top-6 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </span>
            </NavLink>
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
  )
}
