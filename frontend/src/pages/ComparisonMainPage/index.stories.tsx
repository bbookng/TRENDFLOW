import { ComponentStory, ComponentMeta } from '@storybook/react';
import ComparisonMainPage from '@/pages/ComparisonMainPage';

export default {
  title: 'Pages/ComparisonMainPage',
  component: ComparisonMainPage,
} as ComponentMeta<typeof ComparisonMainPage>;

const Template = () => <ComparisonMainPage />;

export const ComparisonMainPageTemplate: ComponentStory<typeof ComparisonMainPage> = Template.bind(
  {}
);
ComparisonMainPageTemplate.args = {};
