import { fireEvent, render, screen, getByLabelText } from '@testing-library/react'
import { config } from 'react-transition-group'
import { SelectProps, prefixCls  } from './select'
import Select from './select'
import { useState } from 'react'
import { lakers } from '../../utils/data';

config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    const {onClick, icon, ...restProps} = props
    return <span onClick={onClick} {...restProps}>{icon}</span>
  }
})

const defaultProps:SelectProps = {
  defaultValue: lakers,
  multiple: true,
  options: lakers.map(value=>({value, label: value})),
  onChange: jest.fn()
}

describe('test control / un-control of Select component',()=>{
  it('should support defaultValue', ()=> {
    render(<Select {...defaultProps}/>)
    // should have all selection
    let items = screen.queryAllByText((_, element) => (element?.classList.contains(`${prefixCls}-selection-item-wrapper`)&&element?.classList?.length === 1 )??false)
    expect(items.length).toEqual(lakers.length)
    const firstItem = items[0] as HTMLElement
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const deleteBtn = getByLabelText(firstItem, 'delete')
    fireEvent.click(deleteBtn)
    expect(defaultProps.onChange).toHaveBeenCalled()
    items = screen.queryAllByText((_, element) => (element?.classList.contains(`${prefixCls}-selection-item-wrapper`)&&element?.classList?.length === 1 )??false)
    expect(items.length).toEqual(lakers.length-1)
  })
  it('should support under control', ()=> {
    const App = () => {
      const [value, setValue] = useState([...lakers]);
      const handleChange = (value: any, values: any) => {
        setValue(values);
      }
      return <Select value={value} multiple onChange={handleChange}/>
    }
    render(<App />)
    // should have all selection
    let items = screen.queryAllByText((_, element) => (element?.classList.contains(`${prefixCls}-selection-item-wrapper`)&&element?.classList?.length === 1 )??false)
    expect(items.length).toEqual(lakers.length)
    const firstItem = items[0] as HTMLElement
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const deleteBtn = getByLabelText(firstItem, 'delete')
    fireEvent.click(deleteBtn)
    items = screen.queryAllByText((_, element) => (element?.classList.contains(`${prefixCls}-selection-item-wrapper`)&&element?.classList?.length === 1 )??false)
    expect(items.length).toEqual(lakers.length-1)
  })
})

describe('test select component', () => {
  it('should render the corrent default select', ()=> {
      render(<Select {...defaultProps}></Select>)
      const el = screen.queryByText('', {selector: `.${prefixCls}`})
      expect(el).toBeInTheDocument()
  })

  it('should render options with right count', ()=> {
    render(<Select {...defaultProps}></Select>)
    const el = screen.getByText('', {selector: `.${prefixCls}`})
    let optionsEl = screen.queryByText('', {selector: `.${prefixCls}-options-wrapper`})
    expect(optionsEl).toBeNull()
    fireEvent.click(el)
    let items = screen.queryAllByText((_, element) => element?.classList.contains(`${prefixCls}-option`)??false)
    expect(items.length).toEqual(lakers.length)
  })
})