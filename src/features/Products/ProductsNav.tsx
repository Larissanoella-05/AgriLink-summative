"use client"

import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

export default function ProductsNav() {
  const [searchParams, setSearchParams] = useSearchParams()
  function handleClick(value: string) {
    searchParams.set("category", value)
    setSearchParams(searchParams)
  }

  const choosenCategory = searchParams.get("category") || "all"
  const { t } = useTranslation()
  return (
    <ul className="space-y-4">
      <li
        onClick={() => handleClick("all")}
        className={
          choosenCategory === "all"
            ? "block bg-green-500 px-2 py-2 font-poppins text-base font-medium text-white transition-all duration-300 hover:cursor-not-allowed"
            : "block px-2 py-2 font-poppins text-base font-medium text-foreground transition-all duration-300 hover:cursor-pointer hover:bg-green-100 dark:hover:bg-green-800"
        }
      >
        {t("all")}
      </li>
      <li
        onClick={() => handleClick("vegetables")}
        className={
          choosenCategory === "vegetables"
            ? "block bg-green-500 px-2 py-2 font-poppins text-base font-medium text-white transition-all duration-300 hover:cursor-not-allowed"
            : "block px-2 py-2 font-poppins text-base font-medium text-foreground transition-all duration-300 hover:cursor-pointer hover:bg-green-100 dark:hover:bg-green-800"
        }
      >
        {t("vegetables")}
      </li>
      <li
        onClick={() => handleClick("fruits")}
        className={
          choosenCategory === "fruits"
            ? "block bg-green-500 px-2 py-2 font-poppins text-base font-medium text-white transition-all duration-300 hover:cursor-not-allowed"
            : "block px-2 py-2 font-poppins text-base font-medium text-foreground transition-all duration-300 hover:cursor-pointer hover:bg-green-100 dark:hover:bg-green-800"
        }
      >
        {t("fruits")}
      </li>
      <li
        onClick={() => handleClick("grains")}
        className={
          choosenCategory === "grains"
            ? "block bg-green-500 px-2 py-2 font-poppins text-base font-medium text-white transition-all duration-300 hover:cursor-not-allowed"
            : "block px-2 py-2 font-poppins text-base font-medium text-foreground transition-all duration-300 hover:cursor-pointer hover:bg-green-100 dark:hover:bg-green-800"
        }
      >
        {t("grains")}
      </li>
      <li
        onClick={() => handleClick("roots")}
        className={
          choosenCategory === "roots"
            ? "block bg-green-500 px-2 py-2 font-poppins text-base font-medium text-white transition-all duration-300 hover:cursor-not-allowed"
            : "block px-2 py-2 font-poppins text-base font-medium text-foreground transition-all duration-300 hover:cursor-pointer hover:bg-green-100 dark:hover:bg-green-800"
        }
      >
        {t("roots")}
      </li>
    </ul>
  )
}
