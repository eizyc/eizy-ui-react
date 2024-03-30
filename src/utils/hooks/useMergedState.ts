// learn from https://github.com/react-component/util/blob/master/src/hooks/useMergedState.ts

import useState from './useSafeState';
import useEvent from './useEvent';
import useLayoutUpdateEffect from './update/useUpdateLayoutEffect'

type Updater<T> = (
  updater: T | ((origin: T) => T),
  ignoreDestroy?: boolean,
) => void;

/** We only think `undefined` is empty */
function hasValue(value: any) {
  return value !== undefined;
}

// have value prop and value!==undeifned -> control mode, otherwise un-control mode
export default function useMergedState<T, R = T>(
  defaultStateValue?: T | (() => T),
  option?: {
    defaultValue?: T | (() => T);
    value?: T;
    onChange?: (value: T, prevValue: T) => void;
    postState?: (value: T) => T;
  },
):[R, Updater<T>]{

  const { defaultValue, value, onChange, postState } = option || {}

  // ======================= Init =======================

  const [innerValue, setInnerValue] = useState<T>(() => {
    if (hasValue(value)) {
      // when has `value` prop
      return value;
    } else if (hasValue(defaultValue)) {
      // when has `defaultValue` prop
      return typeof defaultValue === 'function'
        ? (defaultValue as any)()
        : defaultValue;
    } else {
      // when no `defaultValue` or `value` prop, use the `defaultStateValue`
      return typeof defaultStateValue === 'function'
        ? (defaultStateValue as any)()
        : defaultStateValue;
    }
  })

    // when `value` prop has real value (no undefined), it's control mode, so use the value from prop, otherwise use the innerValue
    const mergedValue:any = value !== undefined ? value : innerValue;
    // if has postState func, call it to format mergedValue
    const postMergedValue = (postState?.(mergedValue)??mergedValue);

    // ====================== Change ======================
    const onChangeFn = useEvent(onChange);
    const [prevValue, setPrevValue] = useState<T>(mergedValue);


    // [DIFF] with rc-utils, cuz they use prevValue, will have a bug that the first change of un-control mode, prevValue == defaultValue  would no trigger
    useLayoutUpdateEffect(() => {
      if (innerValue !== prevValue) {
        onChangeFn(innerValue, prevValue);
      }
    }, [innerValue]);

    // Sync value back to `undefined` when it from control to un-control
    useLayoutUpdateEffect(() => {
      if (!hasValue(value)) {
        setInnerValue(value as T);
      }
    }, [value]);



    // ====================== Update ======================
    const triggerChange: Updater<T> = useEvent((updater, ignoreDestroy) => {
      // [DIFF] Same reason above, use innerValue to trigger update effect
      setPrevValue(mergedValue, ignoreDestroy);
      setInnerValue(updater, ignoreDestroy);
    });

    return [postMergedValue as unknown as R, triggerChange]
  }; 
