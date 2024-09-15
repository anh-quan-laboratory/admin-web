import { Customer, Doctor, User, UserRole, UserSchema } from "../types/user";
import { axiosInstance } from "./axiosConfig";

export async function getUsers(role: any): Promise<User[]> {
  const response = await axiosInstance.get("users", {
    params: { role: role ?? "all" },
  });
  const users: User[] = response.data.data.users;

  if (role === UserRole.CUSTOMER) {
    return users as Customer[];
  } else if (role === UserRole.DOCTOR) {
    return users as Doctor[];
  }

  return users;
}

export async function createUser(data: UserSchema): Promise<User> {
  const response = await axiosInstance.post("users", data);
  const user: any = response.data.data.user;

  return data.role === UserRole.CUSTOMER
    ? (user as Customer)
    : (user as Doctor);
}

export async function deleteUser(id: string) {
  await axiosInstance.delete(`users/${id}`);
}

export async function editUser(id: string, data: UserSchema): Promise<User> {
  const response = await axiosInstance.patch(`users/${id}`, data);
  const user: any = response.data.data.user;

  return data.role === UserRole.CUSTOMER
    ? (user as Customer)
    : (user as Doctor);
}
