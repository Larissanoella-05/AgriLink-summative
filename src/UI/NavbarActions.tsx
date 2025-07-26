"use client"

import { motion } from "framer-motion"
import { AuthModal } from "@/features/Authentication/AuthModal"
import useUser from "@/features/Authentication/useUser"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LanguageSwitch } from "./LanguageSwitch"
import { ThemeToggle } from "./ThemeToggle"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function NavbarActions() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useUser()
  const avatar = user?.user_metadata.avatar

  return (
    <motion.ul
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.li initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <ThemeToggle />
      </motion.li>

      <motion.li initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <LanguageSwitch />
      </motion.li>

      <motion.li initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
        {isAuthenticated ? (
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar
              onClick={() => navigate("/account")}
              className="cursor-pointer ring-2 ring-white/30 hover:ring-yellow-400/60 transition-all duration-300 shadow-glow"
            >
              <AvatarImage src={avatar ? avatar : "/Images/default-user.jpg"} alt="@user" />
            </Avatar>
          </motion.div>
        ) : (
          <AuthModal>
            <motion.button
              className="btn-glow relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-yellow-400 hover:text-green-800 hover:border-yellow-400 hover:shadow-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="relative z-10">{t("join")}</span>
            </motion.button>
          </AuthModal>
        )}
      </motion.li>
    </motion.ul>
  )
}
