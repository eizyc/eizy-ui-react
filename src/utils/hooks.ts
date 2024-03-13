import { useRef, useEffect, useState, RefObject } from "react"

export const useWatch = ( func:Function, deps:Array<any>) => {
  const init = useRef(true)
  useEffect(()=>{
    if (init.current) {
      init.current = false
      return
    }
    func()
  }, deps)
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