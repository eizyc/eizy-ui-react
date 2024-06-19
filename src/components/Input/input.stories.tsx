import type { Meta, StoryObj } from '@storybook/react'
import Input from './input'
import Icon from '../Icon/icon'

type Story = StoryObj<typeof Input>


export const Playground: Story = {
  args: {
    defaultValue: 'play it',
  }
}

/**
 * Use the `disabled` prop to make it disable. Typically use
 */
export const InputWithDisable = {
  args: {
    defaultValue: 'play it',
    disabled: true
  }
}

/**
 * Use the `size` prop to indicate size. Typically use
 */
export const InputWithSize = {
  render:() => (
    <>
      <Input size='sm'></Input>
      <Input size='md'></Input>
      <Input size='lg' block></Input>
    </>
  )
}

/**
 * Use the `size` prop to indicate size. Typically use
 */
export const InputWithIcon = {
  args: {
    prefix: <Icon icon='dollar' />,
    suffix: 'USD'
  }
}

/**
 * Use the `prefix` and `append` prop to indicate it. Typically use
 */
export const CustomedInput:Story = {
  args: {
    defaultValue: 'google',
    prepend: 'https://',
    append: ".com"
  }
}
CustomedInput.storyName = 'Input with prefix and suffix'





/**
 * ### How to import
 * ~~~js
 * import { Input } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Input> = {
  title: 'Basic/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Input',
  }
};

export default meta
