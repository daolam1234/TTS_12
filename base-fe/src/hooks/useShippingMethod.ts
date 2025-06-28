// src/hooks/useShippingMethod.ts

import { shippingMethodService } from "@/services/shippingMethod";
import { useQuery } from "@tanstack/react-query";


export const useShippingMethodList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["shipping-methods", params],
    queryFn: () => shippingMethodService.getAll(params),
  });
};
