
import type { LoginPayload, LoginResponse } from '@/types/auth/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: async (value) => {
      const res = await axios.post(`${API_URL}/auth/login`, value);
      return res.data;
    },
  });
};