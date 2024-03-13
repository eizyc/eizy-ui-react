import { render, screen, fireEvent } from '@testing-library/react'
import { InputProps, prefixCls } from './input'
import Input from './input'
import { STYLE_PREFIX } from "../../utils/const";
import Icon from '../Icon/icon';

const defaultProps:InputProps = {
  defaultValue: 'input',
  onChange: jest.fn(),
  placeholder: 'input-placeholder'
}
  
describe('test input component', () => {
    it('should render the corrent default input', ()=> {
        render(<Input {...defaultProps}/>)
        const el = screen.getByRole('textbox') as HTMLInputElement
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`${prefixCls}-inner`)
        fireEvent.change(el, { target: { value: '12345' } })
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(el.value).toEqual('12345')
    })

    it('should render the disabled Input on disabled prop', () => {
      render(<Input {...defaultProps} disabled/>)
      const el = screen.getByRole('textbox') as HTMLInputElement
      expect(el.disabled).toBeTruthy()
    })

    it('should render different input sizes on size prop', () => {
      render(
        <>
        <Input placeholder="sizes" size="lg" />
        <Input placeholder="sizes" size="sm" />
        </>
      )
      const elLarge = screen.getByText('', {selector: `.${prefixCls}-size-lg`})
      const elSmall = screen.getByText('', {selector: `.${prefixCls}-size-sm`})
      expect(elLarge).toBeInTheDocument()
      expect(elSmall).toBeInTheDocument()
    })

    it('should render prefix and suffix element on prefix/suffix property', () => {
      render(<Input prefix={<Icon icon='dollar' />} suffix="USD"/>)
      const icon = screen.getByText('', {selector: `.${STYLE_PREFIX}-icon`})
      expect(icon).toBeInTheDocument()
      expect(screen.getByText('USD')).toBeInTheDocument()
    })

    it('should render prepand and append element on prepand/append property', () => {
      render(<Input prepend="https://" append=".com"/>)
      expect(screen.getByText('https://')).toBeInTheDocument()
      expect(screen.getByText('.com')).toBeInTheDocument()
    })
})