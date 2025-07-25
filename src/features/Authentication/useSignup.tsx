import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate: signingUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: ({ data }) => {
      console.log("Signup successful:", data);
      queryClient.setQueryData(["user"], data.user);
      navigate("/home", { replace: true });
      toast.success(t("toastSignedInUser"));
    },
    onError: (err) => {
      console.error("Signup error:", err);
      toast.error(err.message || "Signup failed. Please try again.");
    },
  });

  return { signingUp, isSigningUp };
}

export default useSignup;
