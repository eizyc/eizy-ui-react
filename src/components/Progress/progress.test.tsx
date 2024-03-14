import { render, screen } from '@testing-library/react'
import { ProgressProps } from './progress'
import Progress from './progress'
import { STYLE_PREFIX } from "../../utils/const";

const defaultProps:ProgressProps = {
  percent: 60
}
  
describe('test progress component', () => {
    it('should render the corrent default progress', ()=> {
        render(<Progress {...defaultProps}></Progress>)
        const el = screen.getByText('progress')
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`${STYLE_PREFIX}-progress`)
    })
})