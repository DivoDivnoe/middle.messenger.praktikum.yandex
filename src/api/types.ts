export type SigninData = {
  ['login']: string;
  ['password']: string;
};

export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserMainData = {
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
};

export type User = UserMainData & {
  id: number;
  avatar: string;
};

export type PasswordUpdateType = {
  oldPassword: string;
  newPassword: string;
};
