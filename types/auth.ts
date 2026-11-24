export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}