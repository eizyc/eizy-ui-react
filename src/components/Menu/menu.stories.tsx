import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
import { subcomponentsDocs } from '../../utils/storybook'

type Story = StoryObj<typeof Menu>


export const Playground: Story =  {
  render: ()=>(
  <Menu
    defaultActive={'0'}
    onSelect={action('selected!')}
    mode="horizontal"
    defaultOpenSubMenus={[]}
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="drop-down-menu">
      <MenuItem>
        drop-down-menu-1
      </MenuItem>
      <MenuItem>
        drop-down-menu-2
      </MenuItem>
    </SubMenu>
  </Menu>
  )
}

export const MenuWithVertical: Story =  {
  render: ()=>(
    <Menu
    defaultActive={'0'}
    onSelect={action('selected!')}
    mode="vertical"
    defaultOpenSubMenus={[]}
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="drop-down-menu">
      <MenuItem>
        drop-down-menu-1
      </MenuItem>
      <MenuItem>
        drop-down-menu-2
      </MenuItem>
    </SubMenu>
  </Menu>
  )
}

export const MenuWithDefaultOpenSubMenus: Story =  {
  render: ()=>(
  <Menu
    defaultActive={'0'}
    onSelect={action('selected!')}
    defaultOpenSubMenus={['2']}
    mode="vertical"
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="drop-down-menu">
      <MenuItem>
        drop-down-menu-1
      </MenuItem>
      <MenuItem>
        drop-down-menu-2
      </MenuItem>
    </SubMenu>
  </Menu>
  )
}

/**
 * ### How to import
 * ~~~js
 * import { Menu, MenuItem, SubMenu } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Menu> = {
  title: 'Basic/Menu',
  component: Menu,
  subcomponents: {
    // https://github.com/storybookjs/storybook/issues/23170
    // @ts-ignore
    MenuItem,
    // @ts-ignore
    SubMenu
  },
  parameters: {
    docs: {
      page: subcomponentsDocs
    }
  },
  tags: ['autodocs'],
};

export default meta