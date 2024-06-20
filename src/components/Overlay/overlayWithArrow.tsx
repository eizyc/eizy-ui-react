import { CSSProperties, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import { OverlayProps } from './overlay';
import { PlacementType } from './placement';
import Overlay from './overlay';
import { getCSSVar } from '../../utils';

export const prefixCls = `${STYLE_PREFIX}-overlay`

export interface OverlayWithArrowProps extends OverlayProps{
    className?: string;
    style?: CSSProperties;
    arrow?: boolean | { pointAtCenter: boolean }
    placement?: PlacementType;

    arrowSize?: number
    arrowOffsetX?: number
    arrowOffsetY?: number
    gap?: number
}

export const OverlayWithArrow: FC<PropsWithChildren<OverlayWithArrowProps>> = (props) => {
    const { className, style, children, placement, overlayName, arrow, arrowSize, arrowOffsetX, arrowOffsetY, gap, ...restProps } = props as any

    const [realPlacement, setPlacement] = useState(placement);

    const showArrow = useMemo(()=>{
      return !!arrow
    }, [arrow])

    const pointAtCenter = useMemo(()=>{
      return typeof arrow === 'boolean'? false: arrow?.pointAtCenter??false
    }, [arrow])
    const classes = classnames(prefixCls, className, `${STYLE_PREFIX}-${overlayName}`, {
      [`${prefixCls}-placement-${realPlacement}`]: realPlacement
    })

    const addGap = useCallback((position: any, { placement: place}: any) => {
        let { left, top } = position
        const arrowOffset = showArrow?arrowSize:0
        const totalOffset = (gap + arrowOffset)
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
      } , [arrowSize, gap, showArrow])

    const postPosition = useCallback((position: any, {target, placement: place}: any) => {
      const arrowOffset = showArrow?arrowSize:0
      setPlacement(place)
      let { left, top } = position
      if (pointAtCenter) {
        // handle pointAtCenter
        if (place.indexOf('Left')!==-1) {
          // topLeft, bottomLeft
          left+=target.width/2 - arrowOffset - arrowOffsetX
        } else if (place.indexOf('Right')!==-1) {
          // topRight, bottomRight
          left+=-target.width/2 + arrowOffset + arrowOffsetX
        } else if (place.indexOf('Top')!==-1) {
          // leftTop, rightTop
          top+=+target.height/2 - arrowOffset - arrowOffsetY
        } else if (place.indexOf('Bottom')!==-1) {
          // leftBottom, rightBottom
          top+=-target.height/2 + arrowOffset + arrowOffsetY
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
    },[addGap, arrowOffsetX, arrowOffsetY, arrowSize, pointAtCenter, showArrow])

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
            {children}
          </div>
      </div>
  </div>);

    return (
    <Overlay 
      style={style}
      placement={placement}
      boforeAutoAdjust={boforeAutoAdjust}
      postPosition={postPosition}
      onVisibleChange={visibleChangeHandler}
      {...restProps}
    >
      {overlayContent}
    </Overlay>)
}

OverlayWithArrow.defaultProps = {
  arrow: true,
  placement: 'top',
  trigger: 'hover',
  arrowSize: 0,
  arrowOffsetX: 0,
  arrowOffsetY: 0,
  gap: 0
}

export default OverlayWithArrow;