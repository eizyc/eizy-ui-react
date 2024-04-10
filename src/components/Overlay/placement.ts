//            topLeft       top        topRight
//    leftTop +-------------------------------+ rightTop
//            |                               |
//       left |        ALIGN(TARGET)          | right
//            |                               |
// leftBottom +-------------------------------+ rightBottom
//            bottomLeft   bottom   bottomRight

import { CSSProperties } from "react";

//    tl       tr
//    +---------+
// cl |  POINT  | cr
//    +---------+
//    bl       br


type point = 'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br';
export type PointsType = [point, point];
export type PlacementType = 'topLeft' | 'top' | 'topRight' | 'leftTop' | 'left' | 'leftBottom' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight';

const getScroll = (node?: HTMLElement) => {
  if ([document.body,window, undefined].includes(node)) {
    return {
      scrollTop: window.scrollY || document.body.scrollTop || document.documentElement.scrollTop  || 0,
      scrollLeft: window.scrollX || document.body.scrollLeft || document.documentElement.scrollLeft || 0,
      scrollHeight: document.body.scrollHeight || document.documentElement.scrollHeight || 0,
      scrollWidth: document.body.scrollWidth || document.documentElement.scrollWidth || 0,
    }
  } else {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth } = node as HTMLElement
    return {
      scrollTop, scrollLeft, scrollHeight, scrollWidth
    }
  }
}

// [overlay, target] means which point in overlay and target need to overlap
const placementMap: { [k in PlacementType]:any } = {
  topLeft: ['bl', 'tl'],
  top: ['bc', 'tc'],
  topRight: ['br', 'tr'],
  leftTop: ['tr', 'tl'],
  left: ['cr', 'cl'],
  leftBottom: ['br', 'bl'],
  rightTop: ['tl', 'tr'],
  right: ['cl', 'cr'],
  rightBottom: ['bl', 'br'],
  bottomLeft: ['tl', 'bl'],
  bottom: ['tc', 'bc'],
  bottomRight: ['tr', 'br'],
}

export interface Box {
  width: number;
  height: number;
  dom: HTMLElement
}

export type HookFunction = (position:CSSProperties, params: {
  target: Box,
  overlay: Box,
  container: HTMLElement,
  placement: PlacementType
})=> {
  top:number
  left:number
}

export interface placementConfig {
  target: HTMLElement;
  overlay: HTMLElement;
  placement?: PlacementType;
  points?: PointsType;
  container: HTMLElement;
  autoAdjustOverflow: boolean;
  boforeAutoAdjust?: HookFunction;
  afterAutoAdjust?: HookFunction;
  postPosition?: HookFunction;
}

export const getPlacement = ({
  target,
  overlay,
  placement = 'bottom',
  points: _points,
  container,
  autoAdjustOverflow,
  boforeAutoAdjust,
  afterAutoAdjust,
  postPosition,
}: placementConfig) => {
  if (!target || !overlay) {
    return {};
  }

  const { width: tWidth, height: tHeight, left: tLeft, top: tTop } = target.getBoundingClientRect();
  const { width: oWidth, height: oHeight } = overlay.getBoundingClientRect();
  const { scrollTop, scrollLeft, scrollHeight, scrollWidth } = getScroll(container);

  const getTopLeft = (placement: PlacementType) => {
    let points = _points as PointsType;
    if (placement in placementMap) {
      points = placementMap[placement] as PointsType;
    }
    const baseTop = tTop + scrollTop;
    const baseLeft = tLeft  + scrollLeft;

    let top = baseTop;
    let left = baseLeft;
    // target-y
    switch (points[1][0]) {
      case 't':
        top += 0;
        break;
      case 'c':
        top += tHeight / 2;
        break;
      case 'b':
        top += tHeight;
        break;
    }
    // target-x
    switch (points[1][1]) {
      case 'l':
        left += 0;
        break;
      case 'c':
        left += tWidth / 2;
        break;
      case 'r':
        left += tWidth;
        break;
    }
    // overlay-y
    switch (points[0][0]) {
      case 't':
        top += 0;
        break;
      case 'c':
        top -= oHeight / 2;
        break;
      case 'b':
        top -= oHeight;
        break;
    }
    // overlay-x
    switch (points[0][1]) {
      case 'l':
        left += 0;
        break;
      case 'c':
        left -= oWidth / 2;
        break;
      case 'r':
        left -= oWidth;
        break;
    }
    return {
      left,
      top,
    }
  }


  let {left, top} = getTopLeft(placement);

  let resultStyle = {
    top,
    left
  };


  if (autoAdjustOverflow && typeof boforeAutoAdjust === 'function') {
    resultStyle = boforeAutoAdjust(resultStyle, {
      target: {
        width: tWidth,
        height: tHeight,
        dom: target
      },
      overlay: {
        width: oWidth,
        height: oHeight,
        dom: overlay
      },
      container,
      placement
    })
  }


  // autoAdjustOverflow
  top = resultStyle.top
  left = resultStyle.left
  let newPlacement = placement;
  
  if( autoAdjustOverflow && (left < 0 || top < 0 || left + oWidth > scrollWidth || top + oHeight > scrollHeight) ) {
    if (top < 0) {
      newPlacement = newPlacement.replace('top', 'bottom') as PlacementType;
      newPlacement = newPlacement.replace('Bottom', 'Top') as PlacementType;
    } else if (top + oHeight > scrollHeight) {
      newPlacement = newPlacement.replace('bottom', 'top') as PlacementType;
      newPlacement = newPlacement.replace('Top', 'Bottom') as PlacementType;
    }
    if (left < 0) {
      newPlacement = newPlacement.replace('left', 'right') as PlacementType;
      newPlacement = newPlacement.replace('Right', 'Left') as PlacementType;
    } else if (left + oWidth > scrollWidth) {
      newPlacement = newPlacement.replace('right', 'left') as PlacementType;
      newPlacement = newPlacement.replace('Left', 'Right') as PlacementType;
    }
    placement = newPlacement
  }

  if (autoAdjustOverflow && typeof afterAutoAdjust === 'function') {
    resultStyle = afterAutoAdjust(resultStyle, {
      target: {
        width: tWidth,
        height: tHeight,
        dom: target
      },
      overlay: {
        width: oWidth,
        height: oHeight,
        dom: overlay
      },
      container,
      placement
    })
  }

  const {left: newleft, top: newtop} = getTopLeft(placement);
  resultStyle = {
    top: newtop,
    left: newleft
  }

  if (typeof postPosition === 'function') {
    resultStyle = postPosition(resultStyle, {
      target: {
        width: tWidth,
        height: tHeight,
        dom: target
      },
      overlay: {
        width: oWidth,
        height: oHeight,
        dom: overlay
      },
      container,
      placement
    })
  }

  return {
    position: 'absolute',
    ...resultStyle
  }




}