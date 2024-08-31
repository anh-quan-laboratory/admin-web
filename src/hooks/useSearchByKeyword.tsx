import { useState } from "react";

interface UseSearchByKeywordProps<T> {
  arr: T[];
  filterFn: (item: T, keyword: string) => boolean;
}

export default function useSearchByKeyword<T>({ arr, filterFn }: UseSearchByKeywordProps<T>) {
  const [keyword, setKeyword] = useState<string>("");

  const filteredData = arr.filter((item) => filterFn(item, keyword.toLowerCase()));

  return { data: filteredData, setKeyword, keyword };
}
