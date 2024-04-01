import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import { SwitcherProps, prefixCls } from './switcher'
import Switch from './switcher'

const defaultProps:SwitcherProps = {
  defaultValue: false,
  onClick: jest.fn(),
  onChange: jest.fn()
}

describe('test control / un-control of Switch component',()=>{
  it('should support defaultValue', ()=> {
    render(<Switch {...defaultProps}/>)
    const el = screen.getByRole('button')
    fireEvent.click(el)
    expect(defaultProps.onChange).toHaveBeenCalledWith(true, false)
  })
  it('should support under control', ()=> {
    const App = () => {
      const [value, setValue] = useState(false);
      const handleChange = (val: boolean) => {
        setValue(val)
      }
      return <Switch value={value} onChange={handleChange}/>
    }
    render(<App />)
    const el = screen.getByRole('button')
    fireEvent.click(el)
    expect(el).toHaveClass(`${prefixCls}-checked`)
  })
})
  
describe('test switcher component', () => {
  it('should render disabled switch when disabled set to true', ()=> {
    render(<Switch {...defaultProps} disabled></Switch>)
    const el = screen.getByRole('button')
    expect(el).toBeDisabled()
    fireEvent.click(el)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})