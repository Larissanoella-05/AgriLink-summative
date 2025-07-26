import type React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

export function HoverCardDemo({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 bg-background">
        <ul className="w-full space-y-2">
          <li className="w-full py-3 text-center hover:bg-green-100 dark:hover:bg-green-800">
            <NavLink to="/products?category=vegetables" className="w-full">
              {t("vegetables")}
            </NavLink>
          </li>
          <li className="w-full py-3 text-center hover:bg-green-100 dark:hover:bg-green-800">
            <NavLink to="/products?category=fruits" className="w-full">
              {t("fruits")}
            </NavLink>
          </li>
          <li className="w-full py-3 text-center hover:bg-green-100 dark:hover:bg-green-800">
            <NavLink to="/products?category=grains" className="w-full">
              {t("grains")}
            </NavLink>
          </li>
          <li className="w-full py-3 text-center hover:bg-green-100 dark:hover:bg-green-800">
            <NavLink to="/products?category=roots" className="w-full">
              {t("roots")}
            </NavLink>
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  )
}
