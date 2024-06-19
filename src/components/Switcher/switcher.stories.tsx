import type { Meta, StoryObj } from '@storybook/react'
import Switcher from './switcher'

type Story = StoryObj<typeof Switcher>


export const Playground: Story = {
  args: {
    defaultValue: false,
    disabled: false
  }
}

/**
 * Use the `checkedChildren` and `unCheckedChildren` prop to show more detail. Typically use
 */
export const SwitcherWithChildren = {
  args: {
    defaultValue: false,
    disabled: false,
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF'
  }
}

/**
 * Use the `checkedChildren` and `unCheckedChildren` prop to show more detail. Typically use
 */
export const SwitcherWithSize = {
  render: () => (
    <>
      <Switcher size='sm'/>
      <Switcher/>
      <Switcher size='lg'/>
    </>
  )
}


/**
 * ### How to import
 * ~~~js
 * import { Switcher } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Switcher> = {
  title: 'Basic/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Switcher',
  }
};

export default meta