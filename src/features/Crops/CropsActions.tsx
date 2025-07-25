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
import { CreateCrop } from "./CreateCrop"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

export default function CropsActions({ id }: { id: number | null | undefined }) {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(value: string) {
    searchParams.set("sortBy", value)
    setSearchParams(searchParams)
  }
  return (
    <div className="flex items-center justify-end gap-3">
      <CreateCrop id={id}></CreateCrop>
      <Select onValueChange={handleClick}>
        <SelectTrigger className="w-fit bg-foreground text-background focus:border-transparent focus:ring focus:ring-green-500 focus-visible:outline-none">
          <SelectValue placeholder={t("cropSortPlaceholder1")} />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectGroup>
            <SelectLabel>{t("cropSortLabel1")}</SelectLabel>
            <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="date-desc">
              {t("newestFirst")}
            </SelectItem>
            <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="date-asc">
              {t("oldestFirst")}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
