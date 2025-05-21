export interface LoginPayload {
  email: string;
  password: string;

}

export interface LoginResponse {
  token: string;
    role: 'admin' | 'user';
  user: {
    id: string;
    name: string;
    email: string;
  };
}
