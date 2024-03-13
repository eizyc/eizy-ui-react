import { CSSProperties, MouseEvent, FC, useContext, PropsWithChildren } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from '../../utils/const';
import { MenuContext } from './menu';

const prefixCls = `${STYLE_PREFIX}-menu-item`

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}


export const MenuItem: FC<PropsWithChildren<MenuItemProps>> = (props) => {
  const { className, index, children, style, disabled } = props
  const context = useContext(MenuContext)

  const classes = classnames(prefixCls, className, {
    [`${STYLE_PREFIX}-disabled`]: disabled,
    [`${STYLE_PREFIX}-active`]: context.index === index,
  })

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    if (typeof index != 'string') return
    context.onSelect?.(index)
  }

  return (
    <li className={classes} style={style} key={index} onClick={handleClick} aria-label='menu item'>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
}


MenuItem.displayName = 'MenuItem'
export default MenuItem;