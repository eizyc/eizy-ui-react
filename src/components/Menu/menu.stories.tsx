import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

type Story = StoryObj<typeof Menu>


// export const Playground: Story = {
//   args: {
//   }
// }

export const defaultMenu: Story =  {
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
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
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
    <SubMenu title="点击下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
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
    <SubMenu title="默认展开下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
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
  tags: ['autodocs'],
  argTypes: {
    onSelect: {
      control: {
        type: 'function'
      },
      description: 'description'
    }
  }
};

export default meta