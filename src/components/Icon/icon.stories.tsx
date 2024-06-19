import type { Meta, StoryObj } from '@storybook/react'
import Icon from './icon'

type Story = StoryObj<typeof Icon>


export const Playground: Story = {
  args: {
    theme: 'primary',
    icon: 'coffee',
    size: 'lg'
  }
}

export const iconWithSize = {
  render:() => (
    <>
          <Icon icon='flask' theme='success' size='sm'/>
          <Icon icon='umbrella' theme='error' size='2x'/>
          <Icon icon='bell' theme='info' size='4x'/>
    </>
  )
}

export const iconWithType = {
  render:() => (
    <>
          <Icon icon='umbrella' theme='error' size='lg'/>
          <Icon icon='bell' theme='info' size='lg'/>
          <Icon icon='flask' theme='success' size='lg'/>
    </>
  )
}

export const iconWithTheme = {
  render:() => (
    <>
          <Icon icon='coffee' theme='error' size='lg'/>
          <Icon icon='coffee' theme='info' size='lg'/>
          <Icon icon='coffee' theme='success' size='lg'/>
    </>
  )
}


/**
 * ### How to import
 * ~~~js
 * import { Icon } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Icon> = {
  title: 'Basic/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    icon:{
      description: 'icon value from [fontawesome](https://fontawesome.com/search?o=r&m=free&s=solid)'
    },
    size: {
      control: { type: 'select' },
      options: ["2xs" ,"xs" ,"sm" ,"lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"],
      description: 'size value from [fontawesome](https://fontawesome.com/search?o=r&m=free&s=solid)'
    }
  },
  parameters: {
    componentSubtitle: 'Icon',
  }
};

export default meta
