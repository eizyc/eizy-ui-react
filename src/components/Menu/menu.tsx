import { useState, useMemo ,Children, CSSProperties, FC, createContext, PropsWithChildren, FunctionComponentElement, cloneElement } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from '../../utils/const';
import { MenuItemProps } from './menuItem';

const prefixCls = `${STYLE_PREFIX}-menu`
type MenuMode = 'horizontal' | 'vertical'
type TriggerMode = 'hover' | 'click'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    defaultActive?: string;
    className?: string;
    mode?: MenuMode;
    triggerMode?: TriggerMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}

interface MenuContextProps {
  index: string;
  onSelect?: SelectCallback
  mode?: MenuMode;
  triggerMode?: TriggerMode;
  defaultOpenSubMenus?: string[];  
}

export const MenuContext = createContext<MenuContextProps>({index: '0'})

export const Menu: FC<PropsWithChildren<MenuProps>> = (props) => {
  const { className, mode, children, style, defaultActive, onSelect, triggerMode: _triggerMode,  defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState<string>(defaultActive as string)

  const triggerMode = useMemo(()=>{
    return _triggerMode??mode === 'vertical'?'click':'hover'
  }, [_triggerMode, mode])


  const classes = classnames(prefixCls, className, {
    [`${prefixCls}-${mode}`]: mode,

  })

  const handleClick = (index: string) => {
    setActive(index)
    onSelect?.(index)
  }

  const shareContext:MenuContextProps = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    triggerMode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return Children.map(children, (child, idx) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const originIndex = childElement.props.index
      const { displayName } = childElement.type
      if (['MenuItem', 'Submenu'].includes(displayName??'')) {
        return cloneElement(childElement, {
          index: originIndex??idx.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} aria-label='menu'>
      <MenuContext.Provider value={shareContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultActive: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu;