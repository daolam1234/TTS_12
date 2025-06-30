// src/hooks/useAccount.ts
import { accountService } from "@/services/accout";
import instanceAxios from "@/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useAccountList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["accounts", params],
    queryFn: () => accountService.getAll(params),
  });
};

export const useLockAccount = () => {
  return useMutation({
    mutationFn: (id: string) => accountService.lockAccount(id),
  });
};

export const useRestoreAccount = () => {
  return useMutation({
    mutationFn: (id: string) => accountService.restoreAccount(id),
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.softDelete,
    onSuccess: () => {
      message.success("Xóa mềm tài khoản thành công");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {
      message.error("Xóa tài khoản thất bại");
    },
  });

};

