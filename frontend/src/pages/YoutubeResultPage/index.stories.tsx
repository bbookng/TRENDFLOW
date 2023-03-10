import { ComponentStory, ComponentMeta } from '@storybook/react';
import YoutubeResultPage from '@/pages/YoutubeResultPage';

export default {
  title: 'Pages/YoutubeResultPage',
  component: YoutubeResultPage,
} as ComponentMeta<typeof YoutubeResultPage>;

const Template = () => <YoutubeResultPage />;

export const YoutubeResultPageTemplate: ComponentStory<typeof YoutubeResultPage> = Template.bind(
  {}
);
YoutubeResultPageTemplate.args = {};
