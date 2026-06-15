import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { createUser } from "../service/user.service";
import { queryClient } from "@/lib/query-client";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("User created successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to create user");
    },
  });
};
