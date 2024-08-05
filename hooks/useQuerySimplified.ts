import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type NonUndefined = {} | null;

const useQuerySimplified = (
  tryFunc: () => NonUndefined | Promise<NonUndefined>,
  key: string,
  options?: UndefinedInitialDataOptions<{} | null, Error, {} | null, string[]>
): [
  boolean,
  (err: any) => void | Promise<void>
] => {
  const { isLoading, refetch, error } = useQuery({
    queryKey: [key],
    queryFn: tryFunc,
    refetchOnWindowFocus: false,
    enabled: false,
    ...options
  })

  const startTransition = useCallback(async (
    catchFunc: (err: any) => void | Promise<void>
  ) => {
    await refetch();
    if (error)
      catchFunc(error);
  }, [])

  return [ isLoading, startTransition ]
}

export default useQuerySimplified;