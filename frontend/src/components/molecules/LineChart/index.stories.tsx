import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineChart from './index';

export default {
  title: 'Molecules/LineChart',
  component: LineChart,
  argTypes: {
    width: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => <LineChart />;

export const Primary = Template.bind({});
Primary.args = {
  width: '120px',
};
