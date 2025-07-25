import { useQuery } from "@tanstack/react-query"
import { getRecentCrops } from "../../services/apiCrops"

export function useRecentCrops() {
  const { data: crops, isLoading } = useQuery({
    queryKey: ["recentCrops"],
    queryFn: getRecentCrops,
  })

  return { crops, isLoading }
}
