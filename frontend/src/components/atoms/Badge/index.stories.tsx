import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from './index';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    width: {
      control: { type: 'text' },
    },
    color: {
      options: ['red', 'blue', 'purple'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: '기본 뱃지',
  width: '120px',
  color: 'red',
};
