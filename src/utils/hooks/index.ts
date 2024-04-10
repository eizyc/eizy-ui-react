import { useRef, useEffect, useState, RefObject } from "react"
export { default as useMergedState } from './useMergedState'
export { default as useUpdateEffect } from './update/useUpdateEffect'
export { default as useUpdateLayoutEffect } from './update/useUpdateLayoutEffect'

export const useDebounce = (value: any, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}


export const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export const useListener = (node: Window|HTMLBaseElement|Document, eventName: string, callback: EventListenerOrEventListenerObject, condition: boolean) => {
  useEffect(() => {
    if (condition) {
      node.addEventListener(eventName, callback);

      return () => {
        node.removeEventListener(eventName, callback, false);
      }
    }
  }, [condition]);
}