import { getUsers } from "@/api/userApi";
import { User, UserRole } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import useSearchByKeyword from "./useSearchByKeyword";

type UseFetchUsersProps = {
  role?: string;
  filterFn?: (item: User, keyword: string) => boolean;
};

export const defaultFilterFn = (item: User, keyword: string) =>
  item.name.toLowerCase().includes(keyword.toLowerCase()) || item.phone.includes(keyword.toLowerCase());

export default function useFetchUsers({ role, filterFn }: UseFetchUsersProps) {
  const isRoleSupported = role && Object.values(UserRole).includes(role as UserRole);

  const query = useQuery({
    queryKey: ["users", { role }],
    queryFn: () => getUsers(isRoleSupported ? role : "all"),
  });

  const { keyword, setKeyword, data } = useSearchByKeyword<User>({
    arr: query.data ?? [],
    filterFn: filterFn ?? defaultFilterFn,
  });

  return { ...query, data, keyword, setKeyword };
}
