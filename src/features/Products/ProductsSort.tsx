"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

export default function ProductsSort() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(value: string) {
    searchParams.set("sortBy", value)
    setSearchParams(searchParams)
  }
  return (
    <div className="flex justify-end pr-3">
      <Select onValueChange={handleClick}>
        <SelectTrigger className="w-fit bg-foreground text-background focus:border-transparent focus:ring focus:ring-green-500 focus-visible:outline-none">
          <SelectValue placeholder={t("sortPlaceholder2")} />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            <SelectLabel>{t("sortLabel2")}</SelectLabel>
            <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="date-asc">
              {t("oldestFirst")}
            </SelectItem>
            <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="date-desc">
              {t("newestFirst")}
            </SelectItem>
            <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="price-asc">
              {t("priceLow")}
            </SelectItem>
            <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="price-desc">
              {t("priceHigh")}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
