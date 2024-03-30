import type { Meta, StoryObj } from '@storybook/react'
import Empty from './empty'

type Story = StoryObj<typeof Empty>


export const Playground: Story = {
  args: {
  }
}

/**
 * The Example
 */
export const Example = {
  render:() => (
    <>
      <Empty></Empty>
    </>
  )
}

/**
 * The Example
 */
export const ExampleWithImage = {
  args: {
    image: 'storybook-test-empty.png',
    imageStyle: {
      height: '180px'
    },
    description: 'NO DATA'
  }
}


/**
 * ### How to import
 * ~~~js
 * import { Empty } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Empty> = {
  title: 'Basic/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Empty',
  }
};

export default meta
