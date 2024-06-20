import type { Meta, StoryObj } from '@storybook/react'
import Tour from './tour'
import Button from '../Button'
import { useLayoutEffect, useRef, useState } from 'react'

type Story = StoryObj<typeof Tour>


// export const Playground: Story = {
//   args: {
//     children: 'play it',
//     steps: [

//     ]
//   }
// }

/**
 * The Example
 */
export const Example = () => {
  const ref1 = useRef<any>(null)
  const ref2 = useRef<any>(null)
  const ref3 = useRef<any>(null)
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}> Start Now</Button>
      <Button buttonType="primary" ref={ref1}>
        Primary
      </Button>
      <Button buttonType="error" ref={ref2}>
      Error
      </Button>
      <Button buttonType="success" ref={ref3} style={{marginTop:'100vh'}}>
        Success
      </Button>
      <Tour 
        open={open}
        onFinish={() => setOpen(false)}
        steps={[
          {
            target: ()=> ref1.current,
            placement: 'bottom',
            title: "Step 1",
            description: "It's a primary button",
          },
          {
            target: ()=>ref2.current,
            renderContent: (currentStep:number) => {
              return (<div>
                Title: Current Step {currentStep}
              </div>);
            },
            placement: 'bottom'
          },
          {
            target: ()=> ref3.current,
            placement: 'bottom',
            title: "Step 3",
            description: "Will scroll into view",
          },
        ]}
      />
    </>
  )
}


/**
 * ### How to import
 * ~~~js
 * import { Tour } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Tour> = {
  title: 'Basic/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Tour',
  }
};

export default meta
