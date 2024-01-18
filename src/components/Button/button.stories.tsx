import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

type Story = StoryObj<typeof Button>


export const Playground: Story = {
  args: {
    onClick: action('clicked'),
    children: 'default button'
  }
}

export const buttonWithSize = {
  render:() => (
    <>
      <Button size="lg"> large button </Button>
      <Button> middle button </Button>
      <Button size="sm"> small button </Button>
    </>
  )
}


/**
 * Use the `buttonType` prop to indicate status. Typically use
 */
export const buttonWithType = {
  render: () => (
    <>
    <Button>default button</Button>
    <Button buttonType='primary'>primary button</Button>
    <Button buttonType='secondary'>primary button</Button>
    <Button buttonType='tertiary'>tertiary button</Button>
    <Button buttonType='link' href="https://google.com"> link button </Button>
    <Button buttonType='error'>error button</Button>
    <Button buttonType='success'>success button</Button>
    <Button buttonType='warning'>warning button</Button>
  </>
  )
}

/**
 * ### How to import
 * ~~~js
 * import { Button } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Button> = {
  title: 'Basic/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: { type: 'radio' },
    }
  },
  parameters: {
    componentSubtitle: 'Basic Button extends form native button',
  }
};

export default meta
