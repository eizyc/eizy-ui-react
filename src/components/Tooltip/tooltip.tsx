import { CSSProperties, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import { OverlayProps } from '../Overlay/overlay';
import { PlacementType } from '../Overlay/placement';
import Overlay from '../Overlay';
import { getCSSVar } from '../../utils';

export const prefixCls = `${STYLE_PREFIX}-tooltip`

export interface TooltipProps extends Omit<OverlayProps, 'trigger' | 'triggerType'|'title'>{
    className?: string;
    style?: CSSProperties;
    arrow?: boolean | { pointAtCenter: boolean }
    placement?: PlacementType;
    title?: ReactElement | string;
    trigger?: OverlayProps['triggerType']
}

export const Tooltip: FC<PropsWithChildren<TooltipProps>> = (props) => {
    const { className, style, children, title, trigger, placement, arrow, ...restProps } = props

    const arrowSize = useRef<number>(0)
    const arrowOffsetX = useRef<number>(0)
    const arrowOffsetY = useRef<number>(0)
    const gap = useRef<number>(0)
    const [realPlacement, setPlacement] = useState(placement);


    useEffect(()=>{
      arrowSize.current = +getCSSVar(`--${prefixCls}-arrow-size`).replace('px','')
      arrowOffsetX.current = +getCSSVar(`--${prefixCls}-arrow-offset-horizontal`).replace('px','')
      arrowOffsetY.current = +getCSSVar(`--${prefixCls}-arrow-offset-vertical`).replace('px','')
      gap.current = +getCSSVar(`--${prefixCls}-gap`).replace('px','')
    })

    const showArrow = useMemo(()=>{
      return !!arrow
    }, [arrow])

    const pointAtCenter = useMemo(()=>{
      return typeof arrow === 'boolean'? false: arrow?.pointAtCenter??false
    }, [arrow])
    const classes = classnames(prefixCls, className, {
      [`${prefixCls}-placement-${realPlacement}`]: realPlacement
    })

    const addGap = useCallback((position: any, { placement: place}: any) => {
        let { left, top } = position
        const arrowOffset = showArrow?arrowSize.current:0
        const totalOffset = (gap.current + arrowOffset)
        if (place.indexOf('top')!==-1) {
          // topLeft, topRight
          top-= totalOffset
        } else if (place.indexOf('bottom')!==-1) {
          // bottomLeft, bottomRight
          top+= totalOffset
        } else if (place.indexOf('left')!==-1) {
          // leftTop, leftBottom
          left-= totalOffset
        } else if (place.indexOf('right')!==-1) {
          // rightTop, rightBottom
          left+= totalOffset
        }
        return {
            ...position,
            left,
            top
        }
      } , [showArrow])

    const postPosition = useCallback((position: any, {target, placement: place}: any) => {
      const arrowOffset = showArrow?arrowSize.current:0
      setPlacement(place)
      let { left, top } = position
      if (pointAtCenter) {
        // handle pointAtCenter
        if (place.indexOf('Left')!==-1) {
          // topLeft, bottomLeft
          left+=target.width/2 - arrowOffset - arrowOffsetX.current
        } else if (place.indexOf('Right')!==-1) {
          // topRight, bottomRight
          left+=-target.width/2 + arrowOffset + arrowOffsetX.current
        } else if (place.indexOf('Top')!==-1) {
          // leftTop, rightTop
          top+=+target.height/2 - arrowOffset - arrowOffsetY.current
        } else if (place.indexOf('Bottom')!==-1) {
          // leftBottom, rightBottom
          top+=-target.height/2 + arrowOffset + arrowOffsetY.current
        }
      }
      const { left: realLeft, top:realTop } = addGap({
        ...position,
        left,
        top
      },
      {target, placement: place})
      return {
          ...position,
          left: realLeft,
          top: realTop
      }
    },[addGap, pointAtCenter, showArrow])

    const boforeAutoAdjust = useCallback((position: any, {target, placement: place}: any) => {
      let { left, top } = position
        const { left: realLeft, top:realTop } = addGap({
          ...position,
          left,
          top
        },
        {target, placement: place})
        return {
            ...position,
            left: realLeft,
            top: realTop
        }
    }, [addGap])

    const visibleChangeHandler = (val: any) => {
      if(!val) {
        setPlacement(undefined)
      }
    }
    

    const overlayContent = (<div className={classes}>
      <div className={`${prefixCls}-content`}>
          {showArrow&&(
            <div className={`${prefixCls}-arrow`}>
            </div>
          )}
          <div className={`${prefixCls}-inner`}>
              {title}
          </div>
      </div>
  </div>);

    return (
    <Overlay 
      style={style}
      trigger={children}
      triggerType={trigger}
      placement={placement}
      boforeAutoAdjust={boforeAutoAdjust}
      postPosition={postPosition}
      onVisibleChange={visibleChangeHandler}
      {...restProps}
    >
      {overlayContent}
    </Overlay>)
}

Tooltip.defaultProps = {
  arrow: true,
  placement: 'top',
  trigger: 'hover'
}

export default Tooltip;