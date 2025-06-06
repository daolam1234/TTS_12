
import { getList, getOne, update, create,type Props } from "@/services/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

import { useNavigate } from "react-router-dom";


export const useList = ({ resource = "categories" }) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};


export const useOne = ({ resource = "categories", id }: Props) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
    enabled: !!id,
  });
};


export const useCreate = ({ resource = "categories" }) => {
  return useMutation({
    mutationFn: (values: any) => create({ resource, values }),
    onSuccess: () => {
      message.success("Thêm danh mục thành công!");
    },
    onError: () => {
      message.error("Thêm danh mục thất bại!");
    },
  });
};


export const useUpdate = ({ resource = "categories" }) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) => update({ resource, id, values }),
    onSuccess: () => {
      message.success("Cập nhật thành công");
      nav("/admin/categorys"); 
    },
  });
};
