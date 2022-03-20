import { useEffect, useRef } from "react";

export interface ILocalStore {
  destroy(): void;
}

const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }
  useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};

export default useLocalStore;
