export const getCSSVar = (varName: string, node?: HTMLElement )=>{
  node = node??document.querySelector("html") as HTMLElement
  return window.getComputedStyle(node).getPropertyValue(varName)
}

export const uuid = ()=> {
  const uuid = window.crypto.getRandomValues(new Uint8Array(8))
  return uuid.toString().split(",").join("")
}