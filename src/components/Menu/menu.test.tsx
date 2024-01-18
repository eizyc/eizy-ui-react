import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
import { renderScss } from '../../utils/jestHelper'
import { STYLE_PREFIX } from "../../utils/const";

const createStyleFile = () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const cssFile = renderScss(`src/components/Menu/_style.scss`)
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

const cssStyleTag = createStyleFile()


const defaultProps:MenuProps = {
  defaultActive: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const menuVerticalProps: MenuProps = {
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

const renderMenu = (props: MenuProps) => (
  <Menu {...props}>
    <MenuItem >
      active
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      click button
    </MenuItem>
  <SubMenu title="dropdown">
      <MenuItem>
        drop1
      </MenuItem>
  </SubMenu>
  <SubMenu title="opened">
    <MenuItem>
      opened1
    </MenuItem>
  </SubMenu>
</Menu>
)

let menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(renderMenu(defaultProps))
    document.body.appendChild(cssStyleTag)
    menuElement = screen.getByRole('list',{ name: 'menu'})
    activeElement = within(menuElement).getByText('active')
    disabledElement = within(menuElement).getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass(`${STYLE_PREFIX}-menu ${defaultProps.className}`)
    const menuItemElement = within(menuElement).getAllByRole("listitem")
    expect(menuItemElement.length).toEqual(5)
    expect(activeElement).toHaveClass(`active`)
    expect(disabledElement).toHaveClass(`disabled`)
  })

  it('click menuitem should change active and call the right callback expect disaled', () => {
    const clickMenuItem = within(menuElement).getByText('click button')
    fireEvent.click(clickMenuItem)
    expect(clickMenuItem).toHaveClass(`active`)
    expect(defaultProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass(`active`)
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should show dropdown items when hover on subMenu', async ()=>{
    const dropMenu = screen.queryByText('drop1')
    expect(dropMenu).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(screen.getByText('drop1'))
    expect(defaultProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(dropMenu).not.toBeVisible()
    })
  })
})

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(renderMenu(menuVerticalProps))
    document.body.appendChild(cssStyleTag)
  })
  it('should render vertical when mode is set to vertical', () => {
    menuElement = screen.getByRole('list',{ name: 'menu'})
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass(`${STYLE_PREFIX}-menu-vertical`)
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = screen.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(screen.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(screen.queryByText('opened1')).toBeVisible()
  })

})