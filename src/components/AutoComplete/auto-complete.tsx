import { useEffect, ChangeEvent, FC, PropsWithChildren, ReactElement, KeyboardEvent, useCallback, useRef, useState} from 'react'
import classnames from 'classnames'
import { STYLE_PREFIX } from '../../utils/const';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import { useClickOutside, useDebounce } from '../../utils/hooks';
import Transition from '../Transition/transition';

const prefixCls = `${STYLE_PREFIX}-auto-complete`
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange' |'value' >{
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onChange?: (value: string) => void;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
  value?: string
}

export const AutoComplete: FC<PropsWithChildren<AutoCompleteProps>> = (props) => {
  const { fetchSuggestions, onSelect, onChange, value, renderOption, ...restProps } = props
  const classes = classnames(prefixCls, {})
  const componentRef = useRef<HTMLDivElement>(null)
  const [ loading, setLoading ] = useState(false)
  const [ inputValue, setInputValue ] = useState<string>(value??'')
  const debouncedValue = useDebounce(inputValue, 300)
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [ activeIdx, setActiveIdx] = useState(-1)
  const triggerSearch = useRef(false)
  useClickOutside(componentRef, () => { setSuggestions([])})

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setActiveIdx(-1)
  }, [debouncedValue, fetchSuggestions])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    else index = index % suggestions.length
    setActiveIdx(index)
  }


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    onChange?.(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
    setSuggestions([])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.key) {
      case 'Enter':
        if (suggestions[activeIdx]) {
          handleSelect(suggestions[activeIdx])
        }
        break
      case 'ArrowUp':
        highlight(activeIdx - 1)
        break
      case 'ArrowDown':
        highlight(activeIdx + 1)
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }
  
  const renderTemplate = useCallback((item: DataSourceType)=>{
    return renderOption?.(item) ?? item?.value
  }, [renderOption])

  const generateDropdown = () => {
    return (
      <Transition
      in={!!suggestions.length || loading}
      animation='zoom-in-top'
      timeout={300}
      onExited={() => { setSuggestions([]) }}>

      <ul className={`${STYLE_PREFIX}-suggestions`}>
        { loading &&
          <div className={`${STYLE_PREFIX}-suggstion-loading-icon`}>
            <Icon icon="spinner" spin/>
          </div>
        }
        {suggestions.map((item, index) => {
          const cnames = classnames(`${STYLE_PREFIX}-suggestion-item`, {
            [`${STYLE_PREFIX}-active`]: index === activeIdx
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    </Transition>
    )
  }
  return (
    <div className={classes} ref={componentRef}>
      <Input
        {...restProps}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {generateDropdown()}
    </div>
  )
  
}

AutoComplete.defaultProps = {
  size: 'md'
}

export default AutoComplete