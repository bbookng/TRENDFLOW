import { ComponentStory, ComponentMeta } from '@storybook/react';
import ComparisonResultPage from '@/pages/ComparisonResultPage';

export default {
  title: 'Pages/ComparisonResultPage',
  component: ComparisonResultPage,
} as ComponentMeta<typeof ComparisonResultPage>;

const Template = () => <ComparisonResultPage />;

export const ComparisonResultPageTemplate: ComponentStory<typeof ComparisonResultPage> =
  Template.bind({});
ComparisonResultPageTemplate.args = {};
