import { FC, PropsWithChildren, createContext, useRef, useState, MouseEvent, Children, FunctionComponentElement, cloneElement, useMemo, useLayoutEffect, createElement, useCallback, CSSProperties } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import Selection from './selection';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import { OptionProps, RawValueType, Option } from './option';
import { useUpdateEffect, useClickOutside, useMergedState } from '../../utils/hooks';
import { useOptions } from './hooks/useOptions'
import { InputProps } from '../Input/input';
import Empty from '../Empty';

export const prefixCls = `${STYLE_PREFIX}-select`

export interface SelectProps extends Omit<InputProps, 'onChange'|'defaultValue'|'value'>{
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    defaultValue?: string | string[];
    value?: string | string[];
    multiple?: boolean;
    name?: string;
    showSearch?: boolean;
    options?: Array<OptionProps>
    onChange?: (selectedValue: RawValueType, selectedValues: RawValueType[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}

export interface SelectContextProps {
  onSelect?: (value: RawValueType, isSelected?: boolean) => void;
  selectedValues: Set<RawValueType>;
  searchValue: string;
  setSearchValue: any;
  multiple?: boolean;
  open?: boolean;
  optionManager?: any;
}

export const SelectContext = createContext<SelectContextProps>(
  { 
    selectedValues: new Set(),
    searchValue: '',
    setSearchValue: ()=>{}
  })

export const Select: FC<PropsWithChildren<SelectProps>> = (props) => {
    const { className, style, defaultValue, value, onChange, disabled, options, multiple, onVisibleChange, showSearch, children, ...restProps } = props

    const componentRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const mergedShowSearch =showSearch ?? multiple ?? false;
    const optionManager = useOptions(options, children)
    const { mergedOptions, optionByValue } = optionManager
    const [ searchValue, setSearchValue ] = useState<string>('')
    const [ open, setOpen ] = useState<boolean>(false)
    const [ values, setValues ] = useMergedState<string|RawValueType[], RawValueType[]>(defaultValue, {
      value,
      postState: (val)=>  typeof val === 'string' ? [val]: val
    });

    const selectedValues = useMemo<Set<RawValueType>>(()=>{
      return new Set(values)
    }, [values])


    const classes = classnames(prefixCls, className, [`${prefixCls}-${multiple?'multiple':'single'}`], {
      [`${STYLE_PREFIX}-disabled`]: disabled,
      [`${STYLE_PREFIX}-open`]: open 
    })

    const filterOptions = useMemo(()=>{
      if (searchValue === '') {
        return mergedOptions
      }
      return mergedOptions.filter(item=>{
        const label = String(item.label??'')
        return label.indexOf(searchValue) !== -1 
      })
    }, [searchValue, mergedOptions])

    useClickOutside(componentRef, () => {
      setOpen(false)
    })

    useUpdateEffect(()=>{
      onVisibleChange?.(open)
      if (open && mergedShowSearch) {
        inputRef.current?.focus()
      }
    }, [open])

    const renderOptions = () => {
      return filterOptions.map(({...rest})=>createElement(Option, {...rest})
      )
    }

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      if (disabled) {
        return
      }
      setOpen(!open)
      onVisibleChange?.(!open)
    }

    const handleOptionClick = useCallback((value: RawValueType, selected?: boolean) => {
      if (!multiple) {
        setOpen(false)
      }
      let updatedValues: Set<RawValueType> = new Set([value])
      // click again to remove selected when is multiple mode
      if (multiple) {
        updatedValues = new Set(selectedValues)
        if (selected) {
          updatedValues.add(value)
        } else {
          updatedValues.delete(value)
        }
      } 
      // clean seach value when select a option if is showSearch mode
      if (selected) {
        setTimeout(()=>{
          setSearchValue('')
        }, 280)
      }
      setValues(Array.from(updatedValues))
      onChange?.(value, Array.from(updatedValues))
  
    },[multiple, values])

    const shareContext:SelectContextProps = useMemo(()=>(
      {
        onSelect: handleOptionClick,
        selectedValues,
        multiple: multiple,
        searchValue,
        setSearchValue,
        open: open,
        optionManager
      }
    ), [handleOptionClick, multiple, open, optionManager, searchValue, values])

    return (
    <div className={classes} onClick={handleClick} ref={componentRef} style={style}>
      <SelectContext.Provider value={shareContext}>
        <Selection ref={inputRef} optionByValue={optionByValue} showSearch={mergedShowSearch}/>
        <div className={`${prefixCls}-arrow`}>
          <Icon icon='angle-down' />
        </div>
        <Transition
          in={open}
          animation="zoom-in-top"
          timeout={300}
        >
          <div className={`${prefixCls}-options-wrapper`} onClick={(e)=>e.stopPropagation()}>
            {
              filterOptions.length === 0?
              <Empty />:
              <ul>
                {renderOptions()}
              </ul>
            }
          </div>
        </Transition>
      </SelectContext.Provider>
    </div>
    )
}

Select.defaultProps = {
  disabled: false
}

export default Select;