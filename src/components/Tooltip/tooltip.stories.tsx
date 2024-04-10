import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from './tooltip'
import Button from '../Button'
import { ButtonProps } from '../Button/button'
import { useState,useMemo } from 'react'
import Switcher from '../Switcher'

type Story = StoryObj<typeof Tooltip>


export const Playground: Story = {
  args: {
    children: <span>Tooltip will show on mouse enter.</span>,
    title: "prompt text",
  }
}

/**
 * The Example
 */

export const Placement = () => {
  const defaultProps:ButtonProps = {
    size: 'sm',
    style: {
      width: '100px',
      margin: '4px'
    }
  }

  const btnProps: ButtonProps = {
    size: 'sm',
    buttonType: 'secondary'
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
  const [trigger, setTrigger] = useState<any>()
  const [arrow, setArrow] = useState<any>()
  const [adjust, setAdjust] = useState<boolean>(true)

  const toolTipProps = useMemo<any>(()=>({
    trigger,
    arrow,
    autoAdjustOverflow: adjust
  }), [trigger, arrow, adjust])
  return (
    <>
    Trigger:
    <Button onClick={()=>setTrigger('hover')} {...btnProps}>Hover</Button>
    <Button onClick={()=>setTrigger('click')} {...btnProps}>Click</Button>
    Arrow:
    <Button onClick={()=>setArrow(true)} {...btnProps}>Show</Button>
    <Button onClick={()=>setArrow(false)} {...btnProps}>Hide</Button>
    <Button onClick={()=>setArrow({pointAtCenter:true})} {...btnProps}>pointAtCenter</Button>
    AutoAdjustOverflow:
    <Switcher defaultValue={adjust} onChange={()=>setAdjust(val=>!val)}></Switcher>
  <div style={{ paddingLeft: 100 ,marginTop: 100}}>
    <div style={{ marginLeft: 100 }}>
      <Tooltip title='topLeft' placement="topLeft" {...toolTipProps}>{topLeft}</Tooltip>
      <Tooltip title='top' placement="top" {...toolTipProps}>{top}</Tooltip>
      <Tooltip title='topRight' placement="topRight" {...toolTipProps}>{topRight}</Tooltip>
    </div>
    <div style={{ width: 100, float: "left" }}>
      <Tooltip title='leftTop leftTop leftTop' placement="leftTop" {...toolTipProps}>{leftTop}</Tooltip>
      <Tooltip title='left' placement="left" {...toolTipProps}>{left}</Tooltip>
      <Tooltip title='leftBottom leftBottom leftBottom' placement="leftBottom" {...toolTipProps}>{leftBottom}</Tooltip>
    </div>
    <div style={{ width: 100, marginLeft: 420 }}>
      <Tooltip title='rightTop rightTop rightTop' placement="rightTop" {...toolTipProps}>{rightTop}</Tooltip>
      <Tooltip title='right' placement="right" {...toolTipProps}>{right}</Tooltip>
      <Tooltip title='rightBottom rightBottom rightBottom' placement="rightBottom" {...toolTipProps}>{rightBottom}</Tooltip>
    </div>
    <div style={{ marginLeft: 100 }}>
      <Tooltip title='bottomLeft' placement="bottomLeft" {...toolTipProps}>{bottomLeft}</Tooltip>
      <Tooltip title='bottom' placement="bottom" {...toolTipProps}>{bottom}</Tooltip>
      <Tooltip title='bottomRight' placement="bottomRight" {...toolTipProps}>{bottomRight}</Tooltip>
    </div>
  </div>
    </>
  )

}


/**
 * ### How to import
 * ~~~js
 * import { Tooltip } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Tooltip> = {
  title: 'Basic/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Tooltip',
  }
};

export default meta
