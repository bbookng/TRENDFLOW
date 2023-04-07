import { ComponentStory, ComponentMeta } from '@storybook/react';

import FilpBadge from '@/components/molecules/FlipBadge';

export default {
  title: 'Molecules/FlipBadge',
  component: FilpBadge,
  argTypes: {
    count: {
      control: { type: 'text' },
    },
    changed: {
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
} as ComponentMeta<typeof FilpBadge>;

const Template: ComponentStory<typeof FilpBadge> = (args) => <FilpBadge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  count: '99%',
  changed: '120건',
  width: '120px',
  type: 'up',
};
