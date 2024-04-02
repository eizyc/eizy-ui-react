import { CSSProperties, FC, PropsWithChildren, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';
import classnames from 'classnames'
import ResizeObserver from 'resize-observer-polyfill';
import { AvatarGroupContext } from "./group";
import { STYLE_PREFIX } from "../../utils/const";


export const prefixCls = `${STYLE_PREFIX}-avatar`

export interface AvatarProps {
    className?: string;
    style?: CSSProperties;
    shape?: 'circle'|'square';
    icon?: ReactNode;
    src?: string | ReactNode;
    gap?: number;
    size?: number | 'lg' | 'md' | 'sm'
}

export const Avatar: FC<PropsWithChildren<AvatarProps>> = (props) => {
    const { className, style, size: propSize, shape: propShape, icon, src, children, gap, ...restProps } = props

    const comRef = useRef<HTMLBaseElement>(null)
    const [scale, setScale] = useState<number>(1)
    const {size: groupSize, shape: groupShape } = useContext(AvatarGroupContext)

    const [size, shape] = useMemo(()=>{
      return [groupSize??propSize, groupShape??propShape]
    }, [propSize, propShape, groupSize, groupShape])

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}-lg`]: size === 'lg',
      [`${prefixCls}-sm`]: size === 'sm',
      [`${prefixCls}-icon`]: icon,
      [`${prefixCls}-image`]: src,
      [`${prefixCls}-${shape}`]: shape,
    })

    const sizeStyle = useMemo(()=>{
      return typeof size === 'number' ? {
        width: size,
        height: size,
        lineHeight: `${size}px`,
        fontSize: size / 2
      } : {}
    }, [size])


    const textStyle = useMemo(()=>({
      lineHeight: `${size}px`,
      transform: `scale(${scale}) translateX(-50%)`
    }), [scale, size])

    const textRefCallback = useCallback( (node: HTMLSpanElement) => {
      if(!node) return;
      const reRender = () => {
        const wraperNode = comRef.current;
        if (!node || !wraperNode) {
          return;
        }
        const wraperWidth = wraperNode.offsetWidth;
        const textWidth = node.offsetWidth;
        const _gap = gap??4

        const scale = wraperWidth - _gap * 2 < textWidth ?
          (wraperWidth - _gap * 2) / textWidth : 1;
        setScale(scale);
      }
  
      const ob = new ResizeObserver(reRender);
      ob.observe(node);
  
    }, [gap])

    return <span className={classes} style={{...style, ...sizeStyle}} ref={comRef} {...restProps}>
      {icon ? icon : null}
      {src ? (typeof src === 'string' ? <img src={src} alt='avatar'/> : src) : null}
      { children && 
        (typeof children === 'string' ? 
          <span
            style={textStyle}
            ref={textRefCallback}
            className={`${prefixCls}-string`}>
              {children}
          </span>
          : children
        ) 
      }
    </span>
}

Avatar.defaultProps = {
  shape: 'circle',
  gap: 4,
}

export default Avatar;