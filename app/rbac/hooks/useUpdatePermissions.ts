"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/lib/query-client";

import { rbacApi } from "../api";

export function useUpdatePermissions() {
  return useMutation({
    mutationFn: ({
      roleId,
      permissions,
    }: {
      roleId: string;
      permissions: any[];
    }) =>
      rbacApi.updatePermissions(roleId, {
        permissions,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });

      toast.success("Permissions updated successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to update permissions",
      );
    },
  });
}
