import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Typography from '@/components/atoms/Typography';

export default {
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      options: ['H1', 'H2', 'H3', 'H4', 'LARGE', 'BASE', 'SMALL', 'X_SMALL'],
      control: { type: 'radio' },
    },
    children: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'text' },
    },
    weight: {
      options: ['normal', 'bold'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const Text = Template.bind({});

Text.args = {
  variant: 'H1',
  children: 'Typography',
};
