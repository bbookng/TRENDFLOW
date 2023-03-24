import { ComponentStory, ComponentMeta } from '@storybook/react';
import LandingPage from '@/pages/LandingPage';

export default {
  title: 'Pages/LandingPage',
  component: LandingPage,
} as ComponentMeta<typeof LandingPage>;

const Template = () => <LandingPage />;

export const LandingPageTemplate: ComponentStory<typeof LandingPage> = Template.bind({});
LandingPageTemplate.args = {};
