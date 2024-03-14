import type { Meta, StoryObj } from '@storybook/react'
import Progress from './progress'

type Story = StoryObj<typeof Progress>


export const Playground: Story = {
  args: {
    percent: 80,
    status: 'active'
  }
}

/**
 * Use the `status` and `showInfo` prop to indicate the info at the right. Typically use
 */
export const ProgressWithStatus = {
  render: () => <>
    <Progress percent={8} />
    <Progress percent={18} showInfo={false}/>
    <Progress percent={40} status='active'/>
    <Progress percent={60} status='error'/>
    <Progress percent={80} status='success'/>
    <Progress percent={100}/>
  </>
}

/**
 * Use the `size` prop to indicate the width and height. Typically use
 */
export const ProgressWithSize = {
  args: {
    percent: 80,
    status: 'active',
    size: [320, 16]
  }
}


/**
 * ### How to import
 * ~~~js
 * import { Progress } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Progress> = {
  title: 'Basic/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Progress',
  },
  argTypes: {
    size: {
      control: 'object',
      description: 'number | string | [number | string, number | string]'
    }
  }
};

export default meta
