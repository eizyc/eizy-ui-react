import { FC } from 'react'
import Overlay, { OverlayProps } from './overlay'
import OverlayWithArrow, { OverlayWithArrowProps } from './overlayWithArrow'

export type IOverlayComponent = FC<OverlayProps> & {
  WithArrow: FC<OverlayWithArrowProps>
}

const OverlayComponent = Overlay as IOverlayComponent

OverlayComponent.WithArrow = OverlayWithArrow

export default OverlayComponent


