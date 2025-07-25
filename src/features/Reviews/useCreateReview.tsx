import type { ReviewForm } from "@/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { insertReviews } from "@/services/apiReviews"

export function useCreateReview() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: (review: ReviewForm) => insertReviews(review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      toast.success(t("newReviewSuccessfullyCreated"))
    },
    onError: (err) => toast.error(err.message),
  })

  return { isCreating, createReview }
}
