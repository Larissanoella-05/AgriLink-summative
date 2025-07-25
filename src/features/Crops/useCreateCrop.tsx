import type { Crop } from "@/interfaces"
import { insertCrop } from "../../services/apiCrops"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useCrops } from "./useCrops"

export function useCreateCrop() {
  const { refetch } = useCrops()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { mutate: createCrop, isPending: isCreating } = useMutation({
    mutationFn: (crop: Crop) => insertCrop(crop),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crops", "recentCrops"] })
      refetch()
      toast.success(t("toastSuccessCropCreation"))
    },
    onError: (err) => toast.error(err.message),
  })

  return { isCreating, createCrop }
}
