import { useRef, useEffect } from "react"

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