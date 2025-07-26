import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";
import { useTranslation } from "react-i18next";

export function useUpdateUser() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: updatingUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success(t("updateUserMessage"));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUser, updatingUser };
}
