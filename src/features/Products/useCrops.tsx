import { useQuery } from "@tanstack/react-query"
import { getCrops } from "../../services/apiCrops"

export function useCrops() {
  const {
    data: crops,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["crops"],
    queryFn: getCrops,
  })

  return { data: crops, crops, isLoading, error }
}
