"use client"

import { useEffect, useState } from "react"
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
import { useTranslation } from "react-i18next"
import { useCrops } from "./useCrops"
import useUser from "../Authentication/useUser"
import { useAuthUsers } from "../Authentication/useAuthUsers"
import { useUpdateCrop } from "./useUpdateCrop"

export interface FormData {
  name: string
  description: string
  image: FileList
  price: number
  category: string
}

export function UpdatePersonalCrop({ id }: { id: number }) {
  const { user } = useUser()
  const userId = user?.id
  const { authUsers } = useAuthUsers()
  const { updateCrops, isEditing } = useUpdateCrop()

  const authUser = authUsers?.find((user) => user.id === userId)
  const authUserId = authUser?.id
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()
  const { crops } = useCrops()
  const selectedCrop = crops?.find((crop) => crop.id === id)

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: selectedCrop?.name || "",
      description: selectedCrop?.description || "",
      image: undefined,
      price: selectedCrop?.price || 0,
      category: selectedCrop?.category || "",
    },
  })

  useEffect(() => {
    if (open && selectedCrop) {
      reset({
        name: selectedCrop.name || "",
        description: selectedCrop.description || "",
        image: undefined,
        price: selectedCrop.price || 0,
        category: selectedCrop.category || "",
      })
    }
  }, [open, selectedCrop, reset])

  const imageFile = watch("image")?.[0]

  const onSubmit = (data: FormData) => {
    updateCrops(
      {
        id: id,
        newCol: {
          image: data.image?.[0] || selectedCrop?.image,
          name: data.name,
          description: data.description,
          category: data.category,
          userId: Number(authUserId),
          price: data.price,
        },
      },
      {
        onSuccess: () => {
          setOpen(false)
          onClear()
        },
      },
    )
  }

  function onClear() {
    reset({
      name: selectedCrop?.name || "",
      description: selectedCrop?.description || "",
      image: undefined,
      price: selectedCrop?.price || 0,
      category: selectedCrop?.category || "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full rounded border border-gray-300 bg-transparent px-4 py-2 text-foreground hover:bg-muted">
          {t("updateCrop")}
        </button>
      </DialogTrigger>
      <DialogContent className="w-[450px] rounded border border-gray-300 bg-background p-6">
        <DialogHeader>
          <DialogTitle className="text-foreground">{t("updateCropwork")}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{t("updateCropworkDescription")}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="name"
              placeholder={t("newCropInputNameField")}
              type="text"
              disabled={isEditing}
              {...register("name")}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>
          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextareaUi
                  {...field}
                  value={field.value}
                  disabled={isEditing}
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
                  {...register("image")}
                  disabled={isEditing}
                />
                <span>{imageFile?.name || t("newCropInputImage")}</span>
              </label>
            </div>
          </div>
          <div>
            <Input
              id="price"
              placeholder={t("newCropInputPrice")}
              type="number"
              step="0.01"
              disabled={isEditing}
              {...register("price")}
            />
            {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
          </div>
          <div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => <SelectForm {...field} onChange={field.onChange} disabled={isEditing} />}
            />
          </div>
          <DialogFooter className="flex gap-2">
            <button
              disabled={isEditing}
              onClick={onClear}
              type="reset"
              className="rounded border border-gray-300 bg-transparent px-4 py-2 text-foreground hover:bg-muted"
            >
              {t("clear")}
            </button>
            <button
              disabled={isEditing}
              type="submit"
              className="flex items-center gap-1 rounded-md bg-green-500 px-4 py-2 font-poppins text-base font-medium text-white hover:bg-green-600 disabled:bg-green-300"
            >
              {t("saveChanges")}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
