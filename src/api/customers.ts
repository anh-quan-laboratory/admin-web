import axios from "axios";
import {
  Customer,
  CustomerSchema,
  Doctor,
  DoctorSchema,
  User,
  UserFormValues,
  UserRole,
  UserSchema,
} from "../types/user";

export async function getAllCustomers(keyword: string = "", role: string = "all"): Promise<User[]> {
  const response = await axios.get(`http://localhost:3000/api/users?role=${role}&keyword=${keyword}`);
  const data = response.data;

  return data?.data.users || [];
}

export async function createCustomer(data: UserFormValues): Promise<User> {
  const response = await axios.post(`http://localhost:3000/api/users`, data);
  return response.data.data.user;
}

export async function editCustomer(id: string, data: Partial<User>): Promise<User> {
  const response = await axios.patch(`http://localhost:3000/api/users/${id}`, data);
  return response.data.data.user;
}
export async function getUsers(role: UserRole.CUSTOMER): Promise<Customer[]>;
export async function getUsers(role: UserRole.DOCTOR): Promise<Doctor[]>;
export async function getUsers(role?: any): Promise<User[]> {
  const response = await axios.get(`http://localhost:3000/api/users`, {
    params: {
      role: role ?? "all"
    }
  });
  const users: User[] = response.data.data.users;

  if (role === UserRole.CUSTOMER) {
    return users as Customer[];
  }
  else if (role === UserRole.DOCTOR) {
    return users as Doctor[];
  }

  return users;
}

export async function createUser(data: CustomerSchema): Promise<Customer>;
export async function createUser(data: DoctorSchema): Promise<Doctor>;
export async function createUser(data: UserSchema): Promise<User> {
  const response = await axios.post(`http://localhost:3000/api/users`, data);
  const user: any = response.data.data.user;

  return data.role === UserRole.CUSTOMER ? (user as Customer) : (user as Doctor);
}
