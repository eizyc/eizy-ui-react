import { Children, createContext, CSSProperties, FC, PropsWithChildren, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import { AvatarProps, Avatar } from './avatar'

export const prefixCls = `${STYLE_PREFIX}-avatar-group`

export interface AvatarGroupProps extends Pick<AvatarProps, 'shape'|'size'> {
    className?: string;
    style?: CSSProperties;
    maxCount?: number;
    maxStyle?: CSSProperties;
}

export type AvatarGroupContextProps = Pick<AvatarProps, 'shape'|'size'>

export const AvatarGroupContext = createContext<AvatarGroupContextProps>({})
export const AvatarGroup: FC<PropsWithChildren<AvatarGroupProps>> = (props) => {
    const { className, style, maxCount, shape, size, maxStyle, children, ...restProps } = props

    const itemCnt = useMemo(()=>{
      return Children.toArray(children).length
    },[children])

    const _children = useMemo(()=>{
      return Children.toArray(children).splice(0, maxCount??itemCnt)
    }, [children, maxCount, itemCnt])

    const restCnt = useMemo(()=>{
        return itemCnt - (maxCount??itemCnt)
    }, [itemCnt, maxCount])

    const shareContext:AvatarGroupContextProps = useMemo(()=>(
      {
        shape, size
      }
    ), [shape, size])

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}-lg`]: size === 'lg',
      [`${prefixCls}-sm`]: size === 'sm',
    })

    const renderMax = () => {

      return <Avatar style={maxStyle}>
        {`+${restCnt}`}
      </Avatar>
    }



    return <div className={classes} style={style} {...restProps}>
      <AvatarGroupContext.Provider value={shareContext}>
        {
        _children
        }
        {
          restCnt>0?renderMax():null
        }
      </AvatarGroupContext.Provider>
    </div>
}

AvatarGroup.defaultProps = {
  shape: 'circle'
}

export default AvatarGroup;