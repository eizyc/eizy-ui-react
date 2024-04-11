import { useState } from 'react';
import { render, screen } from '@testing-library/react'
import { TagProps, prefixCls } from './tag'
import Tag from './tag'

const defaultProps:TagProps = {

}
  
describe('test tag component', () => {
    it('should render the corrent default tag', ()=> {
        render(<Tag {...defaultProps}>tag</Tag>)
        const el = screen.getByText('tag', {selector: `.${prefixCls}`})
        expect(el).toBeInTheDocument()
    })
})