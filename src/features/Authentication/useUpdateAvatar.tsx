import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { UpdateProfileImage } from "../../services/apiAuth";
import { useTranslation } from "react-i18next";

export function useUpdateAvatar() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: updatingAvatar, isPending: isUpdatingAvatar } = useMutation({
    mutationFn: UpdateProfileImage,
    onSuccess: () => {
      toast.success(t("updateUserMessage"));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingAvatar, updatingAvatar };
}
