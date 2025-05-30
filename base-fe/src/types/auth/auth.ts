export interface LoginPayload {
  email: string;
  password: string;

}
export interface FormValues {
  lastName: string;
  firstName: string;
  dob: string;
  gender: "male" | "female";
  email: string;
  password: string;
  confirmPassword?: string;
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
