import { useQuery } from "@tanstack/react-query";
import { getAllTests } from "../api/tests";

export default function useGetAllTests() {
  const query = useQuery({
    queryKey: ["tests"],
    queryFn: async () => getAllTests(),
  });

  return query;
}
