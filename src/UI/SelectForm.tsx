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

interface SelectFormProps {
  onChange: (value: string) => void
  onBlur?: () => void
  value: string
  name: string
  disabled?: boolean
}

export function SelectForm({ onChange, value, name, disabled }: SelectFormProps) {
  const { t } = useTranslation()
  return (
    <Select onValueChange={onChange} value={value} name={name} disabled={disabled}>
      <SelectTrigger className="w-fit bg-background text-foreground focus:border-transparent focus:ring focus:ring-green-500 focus-visible:outline-none">
        <SelectValue placeholder={t("categoryTitle")} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectGroup>
          <SelectLabel>{t("selectCategory")}</SelectLabel>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="vegetables">
            {t("vegetables")}
          </SelectItem>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="fruits">
            {t("fruits")}
          </SelectItem>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="herbs">
            {t("herbs")}
          </SelectItem>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="grains">
            {t("grains")}
          </SelectItem>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="roots">
            {t("roots") || "Roots and Tubers"}
          </SelectItem>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="legumes">
            {t("legumes") || "Legumes"}
          </SelectItem>
          <SelectItem className="hover:!bg-green-100 dark:hover:!bg-green-800" value="seeds">
            {t("seeds")}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
