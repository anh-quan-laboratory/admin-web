import { z } from "zod";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  DOCTOR = "DOCTOR",
}

export enum UserDialogType {
  CREATE = "create",
  EDIT = "edit",
}

export enum UserRoleOption {
  ALL = "all",
  CUSTOMER = UserRole.CUSTOMER,
  DOCTOR = UserRole.DOCTOR,
}


export const userBaseSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  dob: z.string().min(1, "Ngày sinh không được để trống"),
});

export type UserBaseSchema = z.infer<typeof userBaseSchema>;

export type CustomerSchema = UserBaseSchema & {
  role: UserRole.CUSTOMER;
};

export type Customer = CustomerSchema & {
  _id: string;
};

export type DoctorSchema = UserBaseSchema & {
  role: UserRole.DOCTOR;
};

export type Doctor = DoctorSchema & {
  _id: string;
};

export type UserSchema = DoctorSchema | CustomerSchema;

export type User = Customer | Doctor;

export const defaultUserBaseValues: UserBaseSchema = {
  name: "",
  address: "",
  phone: "",
  dob: "",
};

export const defaultCustomerValues: CustomerSchema = { ...defaultUserBaseValues, role: UserRole.CUSTOMER };

export type CreateUserFormValues = Omit<User, "_id">;
export type EditUserFormValues = User;
export type UserFormValues = CreateUserFormValues | EditUserFormValues;