import { ComponentMeta, ComponentStory } from '@storybook/react';
import BarChart from '@/components/molecules/BarChart';

export default {
  title: 'molecules/BarChart',
  component: BarChart,
} as ComponentMeta<typeof BarChart>;

const Template: ComponentStory<typeof BarChart> = () => <BarChart />;

export const Primary = Template.bind({});
Primary.args = {};
