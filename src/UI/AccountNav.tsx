"use client"

import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { User, Package, Settings, BarChart3, LogOut } from "lucide-react"
import useLogout from "../features/Authentication/useLogoutUser"

export default function AccountNav() {
  const { t } = useTranslation()
  const { logout: logoutUser, isLoggingOut } = useLogout()

  const navItems = [
    {
      to: "/account/personal-info",
      icon: User,
      label: t("personalInfo") || "Personal Info",
    },
    {
      to: "/account/manage-crops",
      icon: Package,
      label: t("manageCrops") || "Manage Crops",
    },
    {
      to: "/account/settings",
      icon: Settings,
      label: t("settings") || "Settings",
    },
    {
      to: "/account/analytics",
      icon: BarChart3,
      label: t("analytics") || "Analytics",
    },
  ]

  return (
    <div className="space-y-1">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile and settings</p>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => logoutUser()}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {isLoggingOut ? t("loggingOut") || "Logging out..." : t("logout") || "Logout"}
          </span>
        </button>
      </div>
    </div>
  )
}
