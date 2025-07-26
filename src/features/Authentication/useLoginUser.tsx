import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { LoginData } from "@/interfaces";

export default function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }: LoginData) =>
      loginUser({ email, password }),
    onSuccess: (user) => {
      console.log("Login successful:", user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/home", { replace: true });
      toast.success("Successfully logged in!");
    },
    onError: (err) => {
      console.error("Login error:", err);
      toast.error(
        err.message || "Login failed. Please check your credentials.",
      );
    },
  });

  return { login, isLogin };
}
