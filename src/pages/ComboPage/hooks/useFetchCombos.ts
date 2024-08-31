import { useQuery } from "@tanstack/react-query";
import { getAllCombos } from "../../../api/combos";

export default function useFetchCombos() {
  const query = useQuery({
    queryKey: ["combos"],
    queryFn: getAllCombos,
  });

  return query;
}
