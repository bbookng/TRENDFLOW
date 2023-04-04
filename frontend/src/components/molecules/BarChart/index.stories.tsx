import { ComponentMeta, ComponentStory } from '@storybook/react';
import BarChart, { BarChartPropsInterface } from '@/components/molecules/BarChart';

export default {
  title: 'molecules/BarChart',
  component: BarChart,
} as ComponentMeta<typeof BarChart>;

const Template: ComponentStory<typeof BarChart> = ({
  desktopWidth,
  barColor,
  labels,
  barLabel,
  lineLabel,
  barData,
  lineData,
}: BarChartPropsInterface) => (
  <BarChart
    desktopWidth={desktopWidth}
    barColor={barColor}
    labels={labels}
    barLabel={barLabel}
    lineLabel={lineLabel}
    lineData={lineData}
    barData={barData}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
