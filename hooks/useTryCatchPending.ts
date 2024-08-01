import { useCallback, useState } from "react"

export const useTryCatchPending = (): [
  boolean,
  (tryFunc: () => void | Promise<void>, catchFunc: (err: any) => void | Promise<void>) => void
] => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const executeTryCatchPending = useCallback(async (
    tryFunc: () => void | Promise<void>,
    catchFunc: (err: any) => void | Promise<void>
  ) => {
    setIsPending(true);
    try {
      await tryFunc();
      setIsPending(false);
    } catch (err) {
      await catchFunc(err);
      setIsPending(false);
    }
  }, [])

  return  [ isPending, executeTryCatchPending ] as const;
}