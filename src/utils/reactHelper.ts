import { isValidElement, ReactNode } from 'react';
export const isRealDOMNode = (value: any): value is Node => {
  return value && typeof value.nodeType === 'number';
}

export const isReactNode = (value: any): value is ReactNode => {
  return (
    isValidElement(value) || // ReactElement
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  )
}