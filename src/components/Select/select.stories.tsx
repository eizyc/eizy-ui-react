import type { Meta, StoryObj } from '@storybook/react'
import Select from './select'
import { subcomponentsDocs } from '../../utils/storybook'
import { lakers } from '../../utils/data';
import Option from './option'

type Story = StoryObj<typeof Select>


export const Playground: Story = {
  args: {

  }
}


/**
 * With `mutiple` and `defaultValue` prop in Select component
 */
export const WithMultipleProp = {
  render:() => (
    <>
      <Select multiple defaultValue={lakers}>
        {
          lakers.map(item=>(
            <Option value={item} label={item} key={`WithMultipleProp-${item}`}/>
          ))
        }
      </Select>
    </>
  )
}

/**
 * With `showSearch` prop in Select component
 */
export const WithShowSearchProp = {
  render:() => (
    <>
      <Select multiple value={lakers} style={{marginBottom: '40px'}}>
        {
          lakers.map(item=>(
            <Option value={item} label={item} key={`WithMultipleSearch-${item}`}/>
          ))
        }
      </Select>
      <Select defaultValue={lakers[0]} showSearch>
        {
          lakers.map(item=>(
            <Option value={item} label={item} key={`WithSingleSearch-${item}`}/>
          ))
        }
      </Select>
    </>
  )
}

/**
 * With Option component in Select component
 */
export const WithOptionComponent = {
  render:() => (
    <>
      <Select>
        {
          lakers.map(item=>(
            <Option value={item} label={`${item} show in children`} key={`WithOptionComponent-${item}`}/>
          ))
        }
      </Select>
    </>
  )
}

/**
 * With options props on Select component
 */
export const WithOptionProps = {
  render:() => (
    <>
      <Select options={lakers.map(value=>({value, label: value}))}>
      </Select>
    </>
  )
}

const storyWrapper = (stroyFn: any) => (
  <div style={{padding: '60px 0 120px'}}>
    {stroyFn()}
  </div>
)

/**
 * ### How to import
 * ~~~js
 * import { Select } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Select> = {
  title: 'Basic/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [storyWrapper],
  parameters: {
    componentSubtitle: 'This is Select',
    docs: {
      page: subcomponentsDocs
    }
  },
  subcomponents: {
    // @ts-ignore
    Option
  },
};

export default meta
