export interface Account {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  token?: string;
  role_id?: string;
  status?: string;
  gender?: "male" | "female" | "other";
  birthday?: string;
  address?: string;
  admin: boolean;
  deleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}


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
  accessToken: string;
  refreshToken?: string;
  account: Account;
}

