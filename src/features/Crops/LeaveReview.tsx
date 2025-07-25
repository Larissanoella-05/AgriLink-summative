"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AddReview } from "./ReviewForm"
import { useTranslation } from "react-i18next"
import { useState } from "react"

export function LeaveReview({ id }: { id: number }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full rounded border border-gray-300 bg-transparent px-4 py-2 text-foreground hover:bg-muted">
          {t("addReview")}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-background">
        <AddReview setOpen={setOpen} id={id}></AddReview>
      </PopoverContent>
    </Popover>
  )
}
