// learn from https://github.com/react-component/util/blob/master/src/hooks/useState.ts

import { useRef, useState, useEffect} from 'react'

/**
 * Same as React.useState but `setState` accept `ignoreDestroy` param to not to setState after destroyed.
 * We do not make this auto is to avoid real memory leak.
 * Developer should confirm it's safe to ignore themselves.
 */
type Updater<T> = T | ((prevValue: T) => T);

type SetState<T> = (
  nextValue: Updater<T>,
  ignoreDestroy?: boolean,
) => void;

export default function useSafeState<T>(
  defaultValue: T | (() => T),
): [T, SetState<T>] {
  const destroyRef = useRef(false);
  const [value, setValue] = useState<T>(defaultValue);

  // After Render, set destroyRef.current false
  useEffect(() => {
    destroyRef.current = false;

    // After unmount, set destroyRef.current true
    return () => {
      destroyRef.current = true;
    };
  }, []);

  // The new setState function
  function safeSetState(updater: Updater<T>, ignoreDestroy?: boolean) {
    // Do not update state when after unmount and set ignoreDestroy TRUE
    if (ignoreDestroy && destroyRef.current) {
      return;
    }
    setValue(updater);
  }

  return [value, safeSetState];
}
