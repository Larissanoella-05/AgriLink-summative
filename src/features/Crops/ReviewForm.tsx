"use client"

import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { TextareaUi } from "../../UI/TextArea"
import { useTranslation } from "react-i18next"
import Stars from "@/UI/Stars"
import { useState } from "react"
import { useCreateReview } from "../Reviews/useCreateReview"

interface ReviewFormData {
  name: string
  email: string
  comment: string
  rate: number
}

export function AddReview({
  id,
  setOpen,
}: {
  id: number
  setOpen: (value: boolean) => void
}) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>()

  const { createReview, isCreating } = useCreateReview()
  const { t } = useTranslation()
  const [rating, setRating] = useState<number>(0)

  const onSubmit = (data: ReviewFormData) => {
    createReview(
      {
        ...data,
        rate: rating,
        cropId: id,
      },
      {
        onSettled: () => {
          setOpen(false)
          reset()
        },
      },
    )
  }

  return (
    <div className="space-y-4 border-t border-border pt-6">
      <h3 className="text-lg font-semibold text-foreground">{t("leaveReview")}</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            id="name"
            placeholder={t("commentorName")}
            {...register("name", { required: t("commentorNameError") })}
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>

        <div>
          <Input
            id="email"
            type="email"
            placeholder={t("commentorEmail")}
            {...register("email", {
              required: t("commentorEmailError"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t("commentorEmailMessageError"),
              },
            })}
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>

        <div>
          <Controller
            name="comment"
            rules={{ required: t("commentorReviewError") }}
            control={control}
            render={({ field }) => (
              <TextareaUi
                {...field}
                value={field.value}
                disabled={false}
                placeholder={t("commentorReview")}
              ></TextareaUi>
            )}
          />
          {errors.comment && <span className="text-xs text-red-500">{errors.comment.message}</span>}
        </div>

        <div className="space-y-2">
          <Stars
            rating={rating}
            maxStars={5}
            color="#10b981"
            size={20}
            showRating={true}
            onSetRatingOutside={(newRating) => setRating(newRating)}
          />
          {rating > 0 && (
            <p className="text-sm text-muted-foreground">
              {t("selectedRating")}: {rating} / 5
            </p>
          )}
        </div>

        <button
          disabled={isCreating}
          type="submit"
          className="w-full rounded-md bg-green-500 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          {t("submitReview")}
        </button>
      </form>
    </div>
  )
}
