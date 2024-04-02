import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './avatar'
import AvatarGroup from './group'
import Icon from '../Icon/icon'

type Story = StoryObj<typeof Avatar>


export const Playground: Story = {
  args: {
    children: 'Eizy',
    size: 'lg',
  }
}
export const WithShape: Story = {
  args: {
    children: 'Eizy',
    size: 'lg',
    shape: 'square'
  }
}

/**
 * The Example
 */
export const Example = {
  render:() => (
    <>
    <Avatar icon={<Icon icon='user'/>} />
    <Avatar>U</Avatar>
    <Avatar shape='square'>U</Avatar>
    <Avatar size={40}>USER</Avatar>
    <Avatar src='https://random.imagecdn.app/150/150' />
    <Avatar src={<img src='https://random.imagecdn.app/150/150' style={{ width: 32 }} alt='img' />} />
    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<Icon icon='user'/>} />
  </>
  )
}

/**
 * With Avatar Group
 */
export const WithAvatarGroup = {
  render:() => (
  <>
    <AvatarGroup maxCount={4} maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
      <Avatar icon={<Icon icon='user'/>} />
      <Avatar>U</Avatar>
      <Avatar size={40}>USER</Avatar>
      <Avatar src='https://random.imagecdn.app/150/150' />
      <Avatar src={<img src='https://random.imagecdn.app/150/150' style={{ width: 32 }} alt='img' />} />
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<Icon icon='user'/>} />
    </AvatarGroup>
    <AvatarGroup maxCount={4} shape='square' maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
      <Avatar icon={<Icon icon='user'/>} />
      <Avatar>U</Avatar>
      <Avatar size={40}>USER</Avatar>
      <Avatar src='https://random.imagecdn.app/150/150' />
      <Avatar src={<img src='https://random.imagecdn.app/150/150' style={{ width: 32 }} alt='img' />} />
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<Icon icon='user'/>} />
    </AvatarGroup>
  </>
  )
}


/**
 * ### How to import
 * ~~~js
 * import { Avatar } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Avatar> = {
  title: 'Basic/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Avatar',
  }
};

export default meta
