export enum UserRole {
  CUSTOMER = "CUSTOMER",
  DOCTOR = "DOCTOR",
}

export type User = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  dob: string;
  role: UserRole;
};

export enum UserDialogType {
  CREATE = "create",
  EDIT = "edit",
}

export enum UserRoleOption {
  ALL = "all",
  CUSTOMER = UserRole.CUSTOMER,
  DOCTOR = UserRole.DOCTOR,
}

export type UserFormValues = Omit<User, "_id">;
