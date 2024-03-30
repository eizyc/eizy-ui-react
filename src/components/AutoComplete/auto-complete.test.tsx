import { config } from 'react-transition-group'
import { screen, render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './auto-complete'
import { STYLE_PREFIX } from "../../utils/const";
import { useState } from 'react';

config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>
  return (
    <>name: {itemWithNumber.value}</>
  )
}
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption
}

let inputNode: HTMLInputElement


describe('test control / un-control of AutoComplete component', ()=>{
  it('should support defaultValue', async ()=> {
    render(<AutoComplete {...testProps} defaultValue='a'/>)
    const el = screen.getByRole('textbox') as HTMLInputElement
    expect(el.value).toEqual('a')
    fireEvent.change(el, {target: { value: 'ab'}})
    await waitFor(() => {
      expect(screen.getByText('abc')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('abc'))
    expect(el.value).toEqual('abc')
  })
  it('should support under control', async ()=> {
    const App = () => {
      const [value, setValue] = useState('a');
      const handleChange = (str: string) => {
        setValue(str);
      }
      return <AutoComplete {...testProps} value={value} onChange={handleChange}/>
    }
    render(<App />)
    const el = screen.getByRole('textbox') as HTMLInputElement
    expect(el.value).toEqual('a')
    fireEvent.change(el, {target: { value: 'ab'}})
    await waitFor(() => {
      expect(screen.getByText('abc')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('abc'))
    expect(el.value).toEqual('abc')
  })


})

describe('test AutoComplete component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<AutoComplete {...testProps}/>)
    inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    const items = screen.queryAllByText((_, element) => element?.classList.contains(`${STYLE_PREFIX}-suggestion-item`)??false)
    expect(items.length).toEqual(2)
    //click the first item
    fireEvent.click(screen.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
    //fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    const firstResult = screen.queryByText('ab')
    const secondResult = screen.queryByText('abc')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass(`${STYLE_PREFIX}-active`)
    //arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass(`${STYLE_PREFIX}-active`)
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass(`${STYLE_PREFIX}-active`)
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    render(<AutoComplete {...testPropsWithCustomRender}/>)
    const inputNode = screen.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.getByText('name: ab')).toBeInTheDocument()
    })
  })
  it('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: AutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn((query) => { return Promise.resolve(testArray.filter(item => item.value.includes(query))) }),
      placeholder: 'auto-complete-3',
    }
    render(<AutoComplete {...testPropsWithPromise}/>)
    const inputNode = screen.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.getByText('ab')).toBeInTheDocument()
    })
    expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
  })
})