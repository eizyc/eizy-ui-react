import type { Preview } from "@storybook/react";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories } from '@storybook/blocks';
import React from "react";
import "../src/styles/index.scss"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)
const wrapperStyle:React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    {stroyFn()}
  </div>
)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true
    },
    docs:{
      source: {
        transform: (code, storyContext) => {
          const regex = /render: \(\) => ([\s\S]*)(,|\})/
          const found = code.match(regex)
          if (found && found.length == 3) {
            const text = found[1]?.replaceAll(/<>|<\/>/gi, '')
            return text
          }
          return code
        },
        format: true
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable />
          <Stories />
        </>
      ),
    },
    playground: {
      storyId: "playground",
    }
  },
  globalTypes: {
    locale: {
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'zh', right: '🇨🇳', title: '中文' },
        ],
      },
    }
  },
  decorators: [
    storyWrapper
  ]
};

export default preview;
