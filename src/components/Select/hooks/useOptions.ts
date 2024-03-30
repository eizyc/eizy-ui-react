import { ReactNode, useMemo, Children, FunctionComponentElement, isValidElement, PropsWithChildren } from "react";
import { OptionProps, RawValueType } from "../option";

const convertChildrenToOption = (children: ReactNode):Array<OptionProps>  => {
  return Children.toArray(children).map(node=>{
          if (!isValidElement(node)) {
            return null
          }
          const { type: { displayName }, props, key} = node as FunctionComponentElement<OptionProps>
          if (displayName !== 'Option'){
            console.error("Warning: Select has a child which is not a Option component")
            return null
          }
          return {
            ...props,
            key: key??props.value
          }
        }).filter((data) => data) as Array<OptionProps> ;
}

export const useOptions = (
  options?: Array<OptionProps>,
  children?: ReactNode
  )=>{
  return useMemo(()=>{
    const optionByValue = new Map<RawValueType, OptionProps>();
    let mergedOptions:Array<PropsWithChildren<OptionProps>> = options??[];
    // use props options first, otherwise use option in children
    if (!options) {
      mergedOptions = convertChildrenToOption(children);
    } else {
      mergedOptions = options.map(item=>({
        ...item,
        key: item.value
      }))
    }
    for(let i of mergedOptions) {
      optionByValue.set(i.value, i)
    }
    return {
      mergedOptions,
      optionByValue
    }
  }, [options, children])
}