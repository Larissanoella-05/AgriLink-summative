import type { Crop } from "@/interfaces"
import { updateCrop } from "@/services/apiCrops"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

export function useUpdateCrop() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: updateCrops, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newCol }: { id: number; newCol: Crop }) => updateCrop(id, newCol),
    onSuccess: () => {
      toast.success(t("cropSuccessfullyUpdated"))
      queryClient.invalidateQueries({ queryKey: ["crops"] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isEditing, updateCrops }
}
