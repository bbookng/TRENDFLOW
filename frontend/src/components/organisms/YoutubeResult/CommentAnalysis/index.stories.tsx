import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentAnalysis from '@/components/organisms/YoutubeResult/CommentAnalysis';

export default {
  title: 'organisms/YoutubeResult/CommentAnalysis',
  component: CommentAnalysis,
} as ComponentMeta<typeof CommentAnalysis>;

const Template: ComponentStory<typeof CommentAnalysis> = () => (
  <CommentAnalysis link="https://..." />
);

export const Primary = Template.bind({});
Primary.args = {};
