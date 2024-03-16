import type { Meta, StoryObj } from '@storybook/react'
import { AutoComplete, DataSourceType } from './auto-complete'
import { lakers, lakersWithNumber } from '../../utils/data';

type Story = StoryObj<typeof AutoComplete>
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export const SimpleAutoComplete= {
  args: {
    block: true,
    fetchSuggestions: (query: string) => {
      return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
    },
    placeholder: 'Enter the Name of a Lakers player'
  }
}

export const CustomAutoComplete = {
  args: {
    block: true,
    fetchSuggestions: (query: string) => {
      return lakersWithNumber.filter(player => player.value.includes(query))
    },
    renderOption: (item: DataSourceType) => {
      const itemWithNumber = item as DataSourceType<LakerPlayerProps>
      return (
        <>
          <b>Name: {itemWithNumber.value}</b>
          <span>Jersey Number: {itemWithNumber.number}</span>
        </>
      )
    },
    placeholder: 'Enter the Name of a Lakers player',

  }
}

export const AjaxAutoComplete = {
  args: {
    block: true,
    fetchSuggestions: (query: string) => {
      return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({ items }) => {
          return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
        })
    },
    placeholder: "Enter the username of github",
    renderOption: (item: DataSourceType<GithubUserProps>) => {
      const itemWithGithub = item
      return (
        <>
          <b>Name: {itemWithGithub.value}</b>
          <span>url: {itemWithGithub.url}</span>
        </>
      )
    }
  }
}

/**
 * ### How to import
 * ~~~js
 * import { AutoComplete } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof AutoComplete> = {
  title: 'Basic/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
};
export default meta