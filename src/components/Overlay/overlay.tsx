import { FC, PropsWithChildren, cloneElement, Children, useRef, ReactNode, useState, useMemo, useCallback, ReactElement } from 'react';
import { STYLE_PREFIX } from "../../utils/const";
import useEvent from '../../utils/hooks/useEvent';
import { PlacementType } from './placement';
import Popup, { PopupProps } from './popup';
import { useMergedState } from '../../utils/hooks';
import { useUpdateEffect } from '../../utils/hooks';
import { isReactNode } from '../../utils/reactHelper';

export const prefixCls = `${STYLE_PREFIX}-overlay`
const defaultValue = false

export interface OverlayProps extends Omit<PopupProps, 'defaultValue'|'onChange'> {
  trigger?: ReactNode|HTMLElement;
  triggerType?: 'hover' | 'click';
  placement?: PlacementType;
  overlayName?: string;
}

export const Overlay: FC<PropsWithChildren<OverlayProps>> = (props) => {
    const { className, style, children, trigger, triggerType, target, value, onVisibleChange, ...restProps } = props

    const triggerRef = useRef<any>(null);
    const mouseEnterTimer = useRef<any>(null);
    const mouseOutTimer = useRef<any>(null);
    const [ visible, setVisible ] = useMergedState<boolean>(defaultValue, {
      value,
      defaultValue
    });

    const trggierNeedRender = isReactNode(trigger)

    if (!trggierNeedRender) {
      triggerRef.current = trigger
    }

    const triggerRefCallback = useEvent((node: HTMLBaseElement)=>{
      if (trggierNeedRender) {
        triggerRef.current = node;
      }
    })

    const onMouseEnter = useCallback(()=>{
      if (mouseOutTimer.current) {
        clearTimeout(mouseOutTimer.current);
        mouseOutTimer.current = null;
      }
      if (!mouseEnterTimer.current && !visible) {
        mouseEnterTimer.current = setTimeout(() => {
          setVisible(true);
        }, 100);
      }
    }, [visible])

    const onMouseLeave = useCallback(() => {
      if (mouseEnterTimer.current) {
        clearTimeout(mouseEnterTimer.current);
        mouseEnterTimer.current = null;
      }
      if (!mouseOutTimer.current && visible) {
        mouseOutTimer.current = setTimeout(() => {
          setVisible(false);
        }, 100);
      }
    },[visible])

    const triggerProps = useMemo(()=>{
      switch (triggerType) {
        case 'click':
          return {
            ref: triggerRefCallback,
            onClick: () => setVisible(val=>!val)
          }
        case 'hover':
          return {
            ref: triggerRefCallback,
            onMouseEnter,
            onMouseLeave
          }
      
        default:
          return {
            ref: triggerRefCallback
          }
      }
    }, [onMouseEnter, onMouseLeave, triggerRefCallback, triggerType])


    const popupProps = useMemo(()=>{
      if (triggerType === 'hover') {
        return {
          onMouseEnter,
          onMouseLeave
        }
      }
      return {
      }
    }, [onMouseEnter, onMouseLeave, triggerType])

    const wrapTrigger = (node: ReactNode) => {
      return (typeof node === 'string' ? <span>{node}</span>: 
        Children.toArray(node).length > 1?<>{node}</>: node) as unknown as ReactElement;
    }

    const triggerNode = trggierNeedRender?cloneElement(wrapTrigger(trigger), 
      triggerProps):null

    useUpdateEffect(()=>{
      onVisibleChange?.(visible)
    }, [visible])



    return (
      <>
          {triggerNode}
          <Popup
            target={() => triggerRef.current}
            value={visible}
            {...popupProps}
            {...restProps}
          >      
          {
            typeof children === 'string' ?
              <div style={{ border: '1px solid #999' }}>{children}</div>: 
              children
          }
          </Popup>
      </>
    )
    
}

Overlay.defaultProps = {
  placement: "bottom",
  triggerType: "hover",
  trigger: <div></div>,
}

export default Overlay;