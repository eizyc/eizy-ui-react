export const getCSSVar = (varName: string, node?: HTMLElement )=>{
  node = node??document.querySelector("html") as HTMLElement
  return window.getComputedStyle(node).getPropertyValue(varName)
}