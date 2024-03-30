import { ChangeEvent, useImperativeHandle, MouseEvent, PropsWithChildren, forwardRef, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames'
import { SelectContext } from './select'
import { STYLE_PREFIX } from "../../utils/const";
import Icon from '../Icon/icon';
import { RawValueType } from './option';

const prefixCls = `${STYLE_PREFIX}-select-selection`



export const Selection = forwardRef<HTMLInputElement, PropsWithChildren<any>>((props, ref) => {

  const { optionByValue, showSearch } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [ inputWidth, setInputWidth ] = useState<string>('')

  const { multiple, selectedValues, onSelect, searchValue, setSearchValue } = useContext(SelectContext)
  
  useImperativeHandle(ref, ()=>{
    return inputRef.current as HTMLInputElement
  }, [])
  
  useLayoutEffect(() => {
    setInputWidth((measureRef.current?.scrollWidth??0) + 'px');
  }, [searchValue]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value)
  };

  const removeItem = (e: MouseEvent, value: RawValueType) => {
    e.preventDefault()
    e.stopPropagation()
    onSelect?.(value, false)
  }

  const renderSearch = () => (
    <div className={`${prefixCls}-search ${multiple?`${prefixCls}-item-wrapper`:''}`} style={multiple?{ width: inputWidth }: {}}>
      <input ref={inputRef} value={searchValue} onChange={onInputChange}/>
      {/* Measure Node */}
      {
        multiple&&(
          <span ref={measureRef} className={`${prefixCls}-search-mirror`} aria-hidden>
            {searchValue}&nbsp;
          </span>
        )
      }
  </div>
  )
  return (
  <div className={`${prefixCls}`}>
    {
      Array.from(selectedValues).map(item=>(
        <div className={`${prefixCls}-item-wrapper`} key={item}>
          <span className={`${prefixCls}-item`}>
            <span className={`${prefixCls}-item-content`} style={searchValue?{visibility:'hidden'}:{}}>{optionByValue.get(item)?.label}</span>
            {multiple&&<Icon icon='times' size='xs' aria-label='delete' onClick={(e)=>removeItem(e, item)}/>}
          </span>
        </div>
      ))
    }
    {
      showSearch&& renderSearch()
    }
  </div>
  )
})

Selection.defaultProps = {
}

export default Selection;