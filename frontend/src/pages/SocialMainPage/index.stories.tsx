import { ComponentStory, ComponentMeta } from '@storybook/react';
import SocialMainPage from '@/pages/SocialMainPage';

export default {
  title: 'Pages/SocialMainPage',
  component: SocialMainPage,
} as ComponentMeta<typeof SocialMainPage>;

const Template = () => <SocialMainPage />;

export const SocialMainPageTemplate: ComponentStory<typeof SocialMainPage> = Template.bind({});
SocialMainPageTemplate.args = {};
