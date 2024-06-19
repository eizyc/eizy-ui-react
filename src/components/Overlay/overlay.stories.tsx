import type { Meta, StoryObj } from '@storybook/react'
import Overlay from './overlay'
import { useRef, useState } from 'react'
import Button from '../Button'
import { ButtonProps } from '../Button/button'

type Story = StoryObj<typeof Overlay>


export const Playground: Story = {
  args: {
    children: <div style={{ border: '1px solid red', background:'pink', width: 100, height: 100}}> The Overlay Content </div>,
    placement: 'top',
    trigger: <Button>Trigger Button</Button>
  }
}

/**
 * The Example
 */
// export const Example = {
//   render:() => (
//     <>
//     <Overlay defaultValue={false}>
//       <div style={{
//         border: '1px solid red',
//         width: 300,
//         height: 300
//       }}>
//         The Overlay Content
//       </div>
//     </Overlay>
//     </>
//   )
// }

/**
 * The Placement
 */
export const Placement = () => {
  const defaultProps:ButtonProps = {
    size: 'sm',
    style: {
      width: '100px',
      margin: '4px'
    }
  }
  const topLeft = <Button  {...defaultProps}>topLeft</Button>;
  const top = <Button  {...defaultProps}>top</Button>;
  const topRight = <Button  {...defaultProps}>topRight</Button>;
  const leftTop = <Button  {...defaultProps}>leftTop</Button>;
  const left = <Button  {...defaultProps}>left</Button>;
  const leftBottom = <Button  {...defaultProps}>leftBottom</Button>;
  const rightTop = <Button  {...defaultProps}>rightTop</Button>;
  const right = <Button  {...defaultProps}>right</Button>;
  const rightBottom = <Button  {...defaultProps}>rightBottom</Button>;
  const bottomLeft = <Button  {...defaultProps}>bottomLeft</Button>;
  const bottom = <Button  {...defaultProps}>bottom</Button>;
  const bottomRight = <Button  {...defaultProps}>bottomRight</Button>;

  return <div style={{ paddingLeft: 100 }}>
    <div style={{ marginLeft: 100 }}>
      <Overlay trigger={topLeft} placement="topLeft">topLeft</Overlay>
      <Overlay trigger={top} placement="top">top</Overlay>
      <Overlay trigger={topRight} placement="topRight">topRight</Overlay>
    </div>
    <div style={{ width: 100, float: "left" }}>
      <Overlay trigger={leftTop} placement="leftTop">leftTop</Overlay>
      <Overlay trigger={left} placement="left">left</Overlay>
      <Overlay trigger={leftBottom} placement="leftBottom">leftBottom</Overlay>
    </div>
    <div style={{ width: 100, marginLeft: 420 }}>
      <Overlay trigger={rightTop} placement="rightTop">rightTop</Overlay>
      <Overlay trigger={right} placement="right">right</Overlay>
      <Overlay trigger={rightBottom} placement="rightBottom">rightBottom</Overlay>
    </div>
    <div style={{ marginLeft: 100 }}>
      <Overlay trigger={bottomLeft} placement="bottomLeft">bottomLeft</Overlay>
      <Overlay trigger={bottom} placement="bottom">bottom</Overlay>
      <Overlay trigger={bottomRight} placement="bottomRight">bottomRight</Overlay>
    </div>
  </div>
}



/**
 * ### How to import
 * ~~~js
 * import { Overlay } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Overlay> = {
  title: 'Basic/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Overlay',
  }
};

export default meta
