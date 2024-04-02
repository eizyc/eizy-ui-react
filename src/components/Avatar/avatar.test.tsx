import { render, screen } from '@testing-library/react'
import { prefixCls } from './avatar'
import Avatar from './avatar'
import AvatarGroup from './group';

  
describe('test avatar component', () => {
    it('should render the right default avatar', ()=> {
        render(<Avatar data-testid='a1'></Avatar>)
        const el = screen.getByTestId('a1');
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`${prefixCls} ${prefixCls}-circle`)
    })

    it('should render the right props avatar', ()=> {
      render(
        <>
          <Avatar data-testid='lg1' size='lg'></Avatar>
          <Avatar data-testid='sm1' size='sm' shape='square'></Avatar>
        </>
      )
      const lgEl = screen.getByTestId('lg1');
      const smEl = screen.getByTestId('sm1');
      expect(lgEl).toHaveClass(`${prefixCls} ${prefixCls}-lg`);
      expect(smEl).toHaveClass(`${prefixCls} ${prefixCls}-sm ${prefixCls}-square`);
    })


    it('should render the right count of avatar with maxCount in AvatarGroup', ()=> {
      render(
        <AvatarGroup maxCount={2} data-testid='ag1'>
          <Avatar>U</Avatar>
          <Avatar>U</Avatar>
          <Avatar size={40}>USER</Avatar>
          <Avatar src='https://random.imagecdn.app/150/150' />
          <Avatar src={<img src='https://random.imagecdn.app/150/150' style={{ width: 32 }} alt='img' />} />
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        </AvatarGroup>
      )
      const el = screen.getByTestId('ag1');
      expect(el).toBeInTheDocument()
      let items = screen.queryAllByText((_, element) => element?.classList.contains(`${prefixCls}`)??false)
      expect(items.length).toBe(3)
  })
})