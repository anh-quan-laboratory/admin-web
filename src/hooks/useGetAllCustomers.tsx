import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/customers";
import { UserRole } from "../types/user";

export default function useGetAllCustomers() {
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: () => getUsers(UserRole.CUSTOMER),
  });

  return query;
}
