"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDeleteCrop } from "./useDeleteCrops"
import { useNavigate } from "react-router-dom"

export default function DeleteButton({ id }: { id: number }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isDeleting, deleteCrops } = useDeleteCrop()

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-red-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-red-400 disabled:bg-red-300">
          {t("delete")}
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">{t("deleteTitle")}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{t("deleteDescription")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end gap-2">
          <button
            onClick={() => setOpenDialog(false)}
            className="rounded border border-gray-300 bg-transparent px-4 py-2 text-foreground hover:bg-muted"
          >
            {t("cancelDelete")}
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
            disabled={isDeleting}
            onClick={() => {
              deleteCrops(id)
              navigate("/account/manageCrops/")
              setOpenDialog(false)
            }}
          >
            {t("delete")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
