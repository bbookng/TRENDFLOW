import { ComponentStory, ComponentMeta } from '@storybook/react';

import Divider from './index';

export default {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    themeId: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    type: {
      options: ['solid', 'dashed'],
      control: { type: 'radio' },
    },
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    width: {
      control: { type: 'number' },
    },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: 'solid',
  direction: 'horizontal',
  width: 1,
};
