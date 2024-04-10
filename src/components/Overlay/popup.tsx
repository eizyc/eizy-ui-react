import { CSSProperties, FC, PropsWithChildren, cloneElement, Children, useRef, ReactElement, HTMLAttributes, isValidElement, createElement, useState, useMemo, useCallback } from 'react';
import classnames from 'classnames'
import { createPortal } from 'react-dom'
import { STYLE_PREFIX } from "../../utils/const";
import { useMergedState, useListener, useUpdateEffect } from '../../utils/hooks';
import useEvent from '../../utils/hooks/useEvent';
import { getPlacement, placementConfig, PlacementType } from './placement';

export const prefixCls = `${STYLE_PREFIX}-overlay-popup`

export interface PopupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'|'onChange'> {
    className?: string;
    style?: CSSProperties;
    mask?: boolean;
    defaultValue?: boolean;
    value?: boolean;
    target?: HTMLElement | (() => HTMLElement);
    container?: HTMLElement | (() => HTMLElement);
    placement?: PlacementType;
    autoAdjustOverflow?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    postPosition?: placementConfig['postPosition'];
    boforeAutoAdjust?: placementConfig['boforeAutoAdjust'];
    afterAutoAdjust?: placementConfig['afterAutoAdjust'];
}

const initStyle:CSSProperties = {
  position: "absolute"
}

export const Popup: FC<PropsWithChildren<PopupProps>> = (props) => {
    const { className, style, mask, children, target, container, defaultValue, autoAdjustOverflow, placement, value: pValue, onVisibleChange, postPosition, boforeAutoAdjust, afterAutoAdjust, ...restProps } = props as Required<PropsWithChildren<PopupProps>>
    const popupRef = useRef<any>(null);
    const [positionStyle, setPositionStyle] = useState<CSSProperties>(initStyle);
    const [ value, setValue ] = useMergedState<boolean>(false, {
      value: pValue,
      defaultValue,
      onChange: onVisibleChange
    });

    useUpdateEffect(()=>{
      if(!value){
        setPositionStyle(initStyle);
      }
    }, [value])

    const containerElement = useMemo<HTMLElement>(()=>{
      return typeof container === 'function' ? container() : container;
    }, [container])


    const handleMouseDown = (e: Event): void => {
      const popupElement = popupRef.current
      const targetElement:any = typeof target === 'function' ? target() : target;
      const clickNode = e.target
      if ((popupElement && popupElement.contains(clickNode)) || (targetElement&& targetElement.contains(clickNode))) {
        return;
      }
      setValue(false)
    }
  
    useListener(window, 'mousedown', handleMouseDown, value);
  
    const handleKeyDown = (e: Event) => {
      if (!value || !popupRef.current) {
        return;
      }
      if ((e as KeyboardEvent).key === 'Escape') {
        setValue(false)
      }
    }
  
    useListener(window, 'keydown', handleKeyDown, value);

    // 弹窗挂载，第一次 mount node=真实dom，卸载的时候 node=null
    const popupRefCallback = useCallback( (node: HTMLBaseElement) => {
      popupRef.current = node;
      if (node && target) {
        const targetElement = typeof target === 'function' ? target() : target;
        const style = getPlacement({
          target: targetElement, 
          overlay: node, 
          placement,
          autoAdjustOverflow,
          container: containerElement,
          boforeAutoAdjust,
          postPosition,
          afterAutoAdjust
        });
        setPositionStyle(style);
      }
    }, [target, placement, autoAdjustOverflow, containerElement, boforeAutoAdjust, postPosition, afterAutoAdjust]);


    const child = Children.only(isValidElement(children)?children:createElement('div', null, children )) as ReactElement;

    const newChildren = cloneElement(child, {
      ...restProps,
      ref: popupRefCallback,
      style: {
        ...positionStyle,
        ...child?.props?.style
      }
    });
    if (value) {
      return createPortal(
      <div >
        {mask ? <div className={`${prefixCls}-mask`}/> : null}
        {newChildren}
      </div>, containerElement);
    } else {
      return null
    }
}

Popup.defaultProps = {
  mask: false,
  placement: 'bottom',
  autoAdjustOverflow: true,
  container: document.body
}

export default Popup;