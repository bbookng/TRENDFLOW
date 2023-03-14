import { ComponentStory, ComponentMeta } from '@storybook/react';
import YoutubeMainPage from '@/pages/YoutubeMainPage';

export default {
  title: 'Pages/YoutubeMainPage',
  component: YoutubeMainPage,
} as ComponentMeta<typeof YoutubeMainPage>;

const Template = () => <YoutubeMainPage />;

export const YoutubeMainPageTemplate: ComponentStory<typeof YoutubeMainPage> = Template.bind({});
YoutubeMainPageTemplate.args = {};
