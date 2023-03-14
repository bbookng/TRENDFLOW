import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './index';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'outlined'],
      control: { type: 'radio' },
    },
    children: {
      options: ['Button'],
      control: { type: 'text' },
    },
    fontSize: {
      options: ['LARGE', 'BASE', 'SMALL', 'X_SMALL'],
      control: { type: 'radio' },
    },
    size: {
      options: ['LARGE', 'SMALL'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  fontSize: 'BASE',
  size: 'MEDIUM',
  children: '기본버튼',
};
