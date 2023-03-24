import { ComponentStory, ComponentMeta } from '@storybook/react';

import CountBadge from './index';

export default {
  title: 'Molecules/CountBadge',
  component: CountBadge,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    width: {
      control: { type: 'text' },
    },
    type: {
      options: ['up', 'down', 'same'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof CountBadge>;

const Template: ComponentStory<typeof CountBadge> = (args) => <CountBadge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: '100%',
  width: '120px',
  type: 'up',
};
