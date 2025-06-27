import { attributeService } from "@/services/attribute";
import { useQuery } from "@tanstack/react-query";
export const useAttributeList = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: attributeService.getAll,
  });
};