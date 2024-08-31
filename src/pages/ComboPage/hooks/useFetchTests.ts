import { useState } from "react";
import { getAllTests } from "../../../api/tests";
import { useQuery } from "@tanstack/react-query";

export default function useFetchTests() {
  const [keyword, setKeyword] = useState("");

  const { data: tests } = useQuery({
    queryKey: ["tests"],
    queryFn: getAllTests,
  });

  const filteredTests = tests?.filter((test) => test.name.toLowerCase().includes(keyword.toLowerCase()));

  return { tests, filteredTests, keyword, setKeyword };
}
