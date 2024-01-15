import { fireEvent, render, screen } from '@testing-library/react'
import { ButtonProps } from './button'
import Button from './button'
import { STYLE_PREFIX } from "../../utils/const";

const defaultProps = {
    onClick:jest.fn()
  }
  
const primaryBtnProps:ButtonProps = {
  buttonType: 'primary',
  size: 'sm',
  className:'test'
}

const linkBtnProps:ButtonProps = {
  buttonType: 'link',
  href: 'google.com'
}


describe('test Button component', () => {
    it('should render the corrent default button', ()=> {
        render(<Button {...defaultProps}>Hello</Button>)
        const el = screen.getByText('Hello')
        expect(el).toBeInTheDocument()
        expect(el.tagName).toEqual('BUTTON')
        expect(el).toHaveClass(`${STYLE_PREFIX}-btn ${STYLE_PREFIX}-btn-default`)
        expect(el).not.toBeDisabled()
        fireEvent.click(el)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it( 'should render the correct component based on different props', ()=> {
        render(<Button {...primaryBtnProps}>Hello</Button>)
        const el = screen.getByText('Hello')
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`${STYLE_PREFIX}-btn-primary ${STYLE_PREFIX}-btn-sm ${primaryBtnProps.className}`)
        expect(el).not.toBeDisabled()
    })

    it( 'should render a link when btnType equals link and href id provided', ()=> {
        render(<Button {...linkBtnProps}>Link</Button>)
        const el = screen.getByText('Link')
        expect(el).toBeInTheDocument()
        expect(el.tagName).toEqual('A')
        expect(el).toHaveClass(`${STYLE_PREFIX}-btn-link`)
        expect(el).not.toBeDisabled()
    })
    it('should render disabled button when disabled set to true', ()=> {
      render(<Button {...defaultProps} disabled >Disabled</Button>)
      const el = screen.getByText('Disabled')
      expect(el).toBeDisabled()
      fireEvent.click(el)
      expect(defaultProps.onClick).not.toHaveBeenCalled()
    })
})