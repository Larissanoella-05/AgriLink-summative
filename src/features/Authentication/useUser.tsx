import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const isAuthenticated = user?.role === "authenticated";
  return { isAuthenticated, isLoading, user };
}

export default useUser;
