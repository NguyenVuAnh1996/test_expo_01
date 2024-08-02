import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type NonUndefined = {} | null;

const useQuerySimplified = (
  tryFunc: () => NonUndefined | Promise<NonUndefined>,
  key?: string
): [
  boolean,
  (err: any) => void | Promise<void>
] => {
  const getRandomKey = (num: number) => {
    let result = 'k';
    for (let i = 0; i < num; i++) {
      result += '_' + String(Math.random()).substring(2)
    }
    return result;
  }
  const random = getRandomKey(3);

  const { isLoading, refetch, error } = useQuery({
    queryKey: [key ? key : random],
    queryFn: tryFunc,
    refetchOnWindowFocus: false,
    enabled: false
  })

  const startTransition = useCallback(async (
    catchFunc: (err: any) => void | Promise<void>
  ) => {
    console.log('random: ', random)
    await refetch();
    if (error)
      catchFunc(error);
  }, [])

  return [ isLoading, startTransition ]
}

export default useQuerySimplified;