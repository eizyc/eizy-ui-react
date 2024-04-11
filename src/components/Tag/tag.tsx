import { CSSProperties, FC, PropsWithChildren, ReactNode, useMemo, MouseEvent, cloneElement, isValidElement } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import Icon from '../Icon/icon';
import { Color, Status } from '../../type';

export const prefixCls = `${STYLE_PREFIX}-tag`

export type TagType = Status

export interface TagProps {
    className?: string;
    style?: CSSProperties;
    bordered?: boolean;
    icon?: ReactNode;
    color?:  TagType| Color;
    closeIcon?: ReactNode|boolean;
    onClose?: Function;
}

export const Tag: FC<PropsWithChildren<TagProps>> = (props) => {
    const { className, style: pStyle, children, closeIcon, icon, bordered, color,  onClose, ...restProps } = props

    const closable = useMemo(()=>{
      return !(closeIcon === false || closeIcon === null || closeIcon === undefined)
    },[closeIcon])

    const appendChild = useMemo(()=>{
      if (!closable) return null
      else if (closeIcon===true){
        return <Icon icon='times' aria-label='delete'/>
      } else if (isValidElement(closeIcon)) {
        return closeIcon
      } else {
        return <span>{closeIcon}</span>
      }
    }, [closable, closeIcon])

    const prependChild = useMemo(()=>{
      if (icon === undefined ) {
        return null
      }
      else if (isValidElement(icon)) {
        return icon
      } else {
        return <span>{icon}</span>
      }
    }, [icon])

    const customColor = useMemo(()=>color?.match(/^#/), [color])

    const style = useMemo(()=>{
      const styles = { 
        ...pStyle
      }
      if (customColor) {
        styles['backgroundColor'] = color
      }
      return styles
    }, [pStyle, customColor, color ])

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-has-color`]: customColor,
      [`${prefixCls}-${color}`]: color && !customColor,
    })

    const handleClick = (e: MouseEvent<SVGSVGElement>) => {
      onClose?.(e)
    }

    const renderPrepend = prependChild&&cloneElement(prependChild,{
      className: `${prefixCls}-prepend-icon`
    }
  )
    const renderAppend = appendChild&&
      cloneElement(appendChild,{
        onClick: handleClick,
        className: `${prefixCls}-append-icon`
      }
    )

    return <span className={classes} style={style} {...restProps}>
      {renderPrepend}
      {children}
      {renderAppend}
    </span>
}

Tag.defaultProps = {
  closeIcon: false,
  bordered: true,
  color: 'default'
}

export default Tag;