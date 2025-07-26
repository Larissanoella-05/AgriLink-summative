import { useQuery } from "@tanstack/react-query"
import { getReviews } from "@/services/apiReviews"

export function useReviews() {
  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  })

  return { reviews, isLoading, refetch }
}
