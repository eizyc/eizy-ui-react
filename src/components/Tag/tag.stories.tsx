import type { Meta, StoryObj } from '@storybook/react'
import Tag, { TagType } from './tag'
import { Color } from '../../type'
import Icon from '../Icon/icon'

type Story = StoryObj<typeof Tag>


export const Playground: Story = {
  args: {
    children: 'play it',
    closeIcon: true
  }
}

/**
 *  WithColors
 */
export const WithColors = () => {
  const colors: Array<Color> = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']
  const status: Array<TagType> = ['default', 'error', 'success', 'warning']
  const presetTags = colors.map(item=>(<Tag color={item} key={item}>{item}</Tag>))
  const statusTags = status.map(item=>(<Tag color={item} key={item}>{item}</Tag>))
  return <>
  <p>Use preset Color</p>
  {presetTags}
  <p>Use Status in Color</p>
  {statusTags}
  </>
}

/**
 *  Borderless
 */
export const Borderless = () => {
  const colors: Array<Color> = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']
  const status: Array<TagType> = ['default', 'error', 'success', 'warning']
  const presetTags = colors.map(item=>(<Tag color={item} key={item} bordered={false}>{item}</Tag>))
  const statusTags = status.map(item=>(<Tag color={item} key={item} bordered={false}>{item}</Tag>))
  return <>
  <p>Use preset Color</p>
  {presetTags}
  <p>Use Status in Color</p>
  {statusTags}
  </>
}

/**
 *  With Icon and CloseIcon
 */
export const WithIcon = () => {
  const icons: any = ['spinner', 'circle-xmark', 'circle-check','circle-exclamation']
  const status: Array<TagType> = ['default', 'error', 'success', 'warning']
  const iconTags = status.map((item,idx)=>(<Tag color={item} key={item} closeIcon={true} icon={<Icon icon={icons[idx]}></Icon>}>{item}</Tag>))
  return iconTags
}

/**
 *  customColor
 */
export const customColor = () => {
  const icons: any = ['water', 'leaf', 'crown','sun']
  const colors: Array<any> = ['#55acee', '#43c06a', '#ece513', '#cd201f']
  const iconTags = colors.map((item,idx)=>(<Tag color={item} key={item} icon={<Icon icon={icons[idx]}></Icon>}>{icons[idx]}</Tag>))
  return iconTags
}



/**
 * ### How to import
 * ~~~js
 * import { Tag } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Tag> = {
  title: 'Basic/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Tag',
  }
};

export default meta
