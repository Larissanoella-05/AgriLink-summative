import { deleteCrop } from "../../services/apiCrops"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useCrops } from "./useCrops"

export function useDeleteCrop() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { refetch } = useCrops()

  const { isPending: isDeleting, mutate: deleteCrops } = useMutation({
    mutationFn: (id: number) => deleteCrop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crops"] })
      refetch()
      toast.success(t("toastSuccessDeleteCrop"))
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteCrops }
}
