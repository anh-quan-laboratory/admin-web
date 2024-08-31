import axios from "axios";
import { User, UserFormValues } from "../types/user";

export async function getAllCustomers(keyword: string = "", role: string = "all"): Promise<User[]> {
  const response = await axios.get(`http://localhost:3000/api/users?role=${role}&keyword=${keyword}`);
  const data = response.data;

  return data?.data.users || [];
}

export async function createCustomer(data: UserFormValues): Promise<User> {
  console.log("createCustomer", data);
  const response = await axios.post(`http://localhost:3000/api/users`, data);
  return response.data.data.user;
}

export async function editCustomer(id: string, data: Partial<User>): Promise<User> {
  console.log("editCustomer", id, data);
  const response = await axios.patch(`http://localhost:3000/api/users/${id}`, data);
  return response.data.data.user;
}
