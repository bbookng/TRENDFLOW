import { ComponentStory, ComponentMeta } from '@storybook/react';

import CircleChart from './index';

export default {
  title: 'Molecules/CircleChart',
  component: CircleChart,
  argTypes: {
    width: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof CircleChart>;

const Template: ComponentStory<typeof CircleChart> = (args) => <CircleChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: '120px',
};
