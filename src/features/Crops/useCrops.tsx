import { useQuery } from "@tanstack/react-query"
import { getCrops } from "../../services/apiCrops"

export function useCrops() {
  const {
    data: crops,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["crops"],
    queryFn: getCrops,
  })

  return { crops, isLoading, refetch }
}
