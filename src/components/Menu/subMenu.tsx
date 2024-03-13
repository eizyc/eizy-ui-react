import { useState, FC, PropsWithChildren, useContext, Children, FunctionComponentElement, cloneElement, MouseEvent, useMemo, useCallback, useRef, useEffect, useDeferredValue } from 'react'
import classnames from 'classnames'
import Transition from '../Transition/transition';
import Icon from '../Icon/icon'
import { useWatch, useClickOutside } from '../../utils/hooks';
import { MenuContext } from './menu';
import { STYLE_PREFIX } from '../../utils/const';
import { MenuItemProps } from './menuItem';

const prefixCls = `${STYLE_PREFIX}-submenu`
const itemPrefixCls = `${STYLE_PREFIX}-menu-item`

export interface SubMenuProps {
  index?: string,
  title: string,
  disabled?: boolean,
  className?: string,
}

export const Submenu: FC<PropsWithChildren<SubMenuProps>> = (props) => {
  const timerRef = useRef<any>();
  const componentRef = useRef(null)
  const subIndexRef = useRef<Array<string>>([]);
  const { index, title, children, disabled, className} = props
  const context = useContext(MenuContext)
  const { mode, defaultOpenSubMenus, triggerMode, index:activeIndex } = context
  const isOpend = (index && mode === 'vertical') ? defaultOpenSubMenus?.includes(index):false
  const [ open , setOpen ] = useState(isOpend)
  
  useClickOutside(componentRef, () => {
    setOpen(false)
  })

  const active = useMemo(()=>{
    return subIndexRef.current.includes(activeIndex)
  }, [activeIndex])

  
  const classes = classnames(prefixCls, itemPrefixCls, className, {
    [`${prefixCls}-${mode}`]: mode,
    [`disabled`]: disabled,
    [`active`]: active,
  })


  useWatch(()=>{
    if (!active){
      setOpen(false)
    }
  },[active])

  const handleClick = useCallback((e: MouseEvent) => {
    if (triggerMode!=='click') return
    setOpen(val=>!val)
  }, [triggerMode])

  const handleMouse = useCallback((e: MouseEvent, toggle: boolean) => {
    clearTimeout(timerRef.current);
    e.preventDefault()
    timerRef.current = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }, [])

  const events = useMemo(()=>{
    if (triggerMode === 'hover'){
      return {
        onMouseEnter: (e: MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: MouseEvent) => { handleMouse(e, false) }
      }
    } else if (triggerMode === 'click'){
      return {
        onClick: handleClick
      }
    } else{
      console.error(`unsupport triggerMode [${triggerMode}], should be click, hover`)
      return {}
    }
  }, [handleClick, handleMouse, triggerMode])


  const renderChildren = () => {
    const submenuClasses = classnames(`${prefixCls}-menu`,{
      [`${STYLE_PREFIX}-open`]: open
    })
    const subIndexs:Array<string> = []
    const childrens = Children.map(children, (child, idx) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const originIndex = childElement.props.index
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        const subIndex = originIndex??`${index}-${idx}`
        subIndexs.push(subIndex)
        return cloneElement(childElement, {
          index: subIndex
        })
      } else {
        console.error('Warning: Submenu has a child which is not a MenuItem component')
      }
    })
    subIndexRef.current = subIndexs
    return (
      <Transition
        in={open}
        timeout={300}
        animation="zoom-in-top"
      >
      <ul className={submenuClasses} aria-label='submenu'>
        {childrens}
      </ul>
    </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...events} ref={componentRef}>
      <div className={`${prefixCls}-title`}>
        <span aria-expanded={open}>{title}</span>
        <Icon icon="angle-down" className={`${STYLE_PREFIX}-arrow-icon`}/>
      </div>
      {renderChildren()}
    </li>
  )
}

Submenu.defaultProps = {
}

Submenu.displayName = 'Submenu'
export default Submenu