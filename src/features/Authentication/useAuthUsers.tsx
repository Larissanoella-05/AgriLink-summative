import { useQuery } from "@tanstack/react-query"
import { getAuthUsers } from "@/services/apiAuthUsers"

export function useAuthUsers() {
  const {
    data: authUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["authUsers"],
    queryFn: getAuthUsers,
  })

  return { authUsers, isLoading, refetch }
}
