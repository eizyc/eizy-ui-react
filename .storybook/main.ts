import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    // autodocs: "tag",
    autodocs: true
  },
  staticDirs: ["../public"],
  features: {
    storyStoreV7: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  }
};
export default config;
