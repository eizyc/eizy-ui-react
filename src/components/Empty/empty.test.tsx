import { render, screen } from '@testing-library/react'
import { EmptyProps } from './empty'
import Empty from './empty'
import { STYLE_PREFIX } from "../../utils/const";

const defaultProps:EmptyProps = {

}
  
describe('test empty component', () => {
    it('should render the corrent default empty', ()=> {
        render(<Empty {...defaultProps}>empty</Empty>)
        const el = screen.getByText('empty')
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`${STYLE_PREFIX}-empty`)
    })
})