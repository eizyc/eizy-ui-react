import { CSSProperties, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OverlayProps } from '../Overlay/overlay';
import { PlacementType } from '../Overlay/placement';
import Overlay from '../Overlay';

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

    

    return (
    <Overlay.WithArrow
      style={style}
      trigger={children}
      triggerType={trigger}
      placement={placement}
      arrowSize={8}
      arrowOffsetX={12}
      arrowOffsetY={8}
      gap={4}
      overlayName={'tooltip'}
      {...restProps}
    >
      {title}
    </Overlay.WithArrow>)
}

Tooltip.defaultProps = {
  arrow: true,
  placement: 'top',
  trigger: 'hover'
}

export default Tooltip;