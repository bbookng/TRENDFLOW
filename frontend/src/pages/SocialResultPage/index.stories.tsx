import { ComponentStory, ComponentMeta } from '@storybook/react';
import SocialResultPage from '@/pages/SocialResultPage';

export default {
  title: 'Pages/SocialResultPage',
  component: SocialResultPage,
} as ComponentMeta<typeof SocialResultPage>;

const Template = () => <SocialResultPage />;

export const SocialResultPageTemplate: ComponentStory<typeof SocialResultPage> = Template.bind({});
SocialResultPageTemplate.args = {};
