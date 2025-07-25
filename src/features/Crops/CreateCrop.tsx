"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { TextareaUi } from "../../UI/TextArea"
import { SelectForm } from "../../UI/SelectForm"
import { useCreateCrop } from "./useCreateCrop"
import { IoMdAdd } from "react-icons/io"
import { useTranslation } from "react-i18next"

export interface FormData {
  name: string
  description: string
  image: FileList
  price: number
  category: string
}

export function CreateCrop({ id }: { id: number | null | undefined }) {
  const [open, setOpen] = useState(false)
  const { createCrop, isCreating } = useCreateCrop()
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const imageFile = watch("image")?.[0]

  const onSubmit = (data: FormData) => {
    const transformedData = {
      ...data,
      image: data.image[0],
      userId: id,
    }

    createCrop(transformedData, {
      onSuccess: () => {
        setOpen(false)
        onClear()
      },
    })
  }

  function onClear() {
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 rounded-md bg-green-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-green-600">
          <IoMdAdd />
          <span>{t("newCropButton")}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[450px] rounded border border-gray-300 bg-background p-6">
        <DialogHeader>
          <DialogTitle className="text-foreground">{t("newCropFormTitle")}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{t("newCropFormCallAction")}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="name"
              placeholder={t("newCropInputNameField")}
              type="text"
              disabled={isCreating}
              {...register("name", {
                required: t("newCropInputNameFieldError"),
              })}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>
          <div>
            <Controller
              name="description"
              rules={{ required: t("newCropInputDescriptionFieldError") }}
              control={control}
              render={({ field }) => (
                <TextareaUi
                  {...field}
                  value={field.value}
                  disabled={isCreating}
                  placeholder={t("newCropInputDescriptionField")}
                ></TextareaUi>
              )}
            />
            {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
          </div>
          <div>
            <div className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground hover:cursor-pointer focus:border-green-500 focus:outline-none">
              <label htmlFor="image" className="text-muted-foreground cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image"
                  {...register("image", {
                    required: t("newCropInputImageError"),
                  })}
                  disabled={isCreating}
                />
                <span>{imageFile?.name || t("newCropInputImage")}</span>
              </label>
            </div>
            {errors.image && <span className="text-xs text-red-500">{errors.image.message}</span>}
          </div>

          <div>
            <Input
              id="price"
              placeholder={t("newCropInputPrice")}
              type="number"
              step="0.01"
              disabled={isCreating}
              {...register("price", { required: t("newCropInputPriceError") })}
            />
            {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
          </div>
          <div>
            <Controller
              name="category"
              control={control}
              rules={{ required: t("newCropSelectCategoryError") }}
              render={({ field }) => <SelectForm {...field} onChange={field.onChange} disabled={isCreating} />}
            />
            {errors.category && <span className="text-xs text-red-500">{errors.category.message}</span>}
          </div>
          <DialogFooter className="flex gap-2">
            <button
              disabled={isCreating}
              onClick={onClear}
              type="reset"
              className="rounded border border-gray-300 bg-transparent px-4 py-2 text-foreground hover:bg-muted"
            >
              {t("newCropClearButton")}
            </button>
            <button
              disabled={isCreating}
              type="submit"
              className="flex items-center gap-1 rounded-md bg-green-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-green-600 disabled:bg-green-300"
            >
              {t("newCropCreateButton")}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
