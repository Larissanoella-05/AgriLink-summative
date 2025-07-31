import { useMutation } from "@tanstack/react-query"
import supabase from "../../services/supabase"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export function useDeleteUser() {
  const navigate = useNavigate()

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id || ""
      )
      if (error) throw error
    },
    onSuccess: () => {
      toast.success("Account deleted successfully")
      navigate("/")
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete account")
    },
  })

  return { deleteUser, isDeleting }
}