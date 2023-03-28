import { ComponentMeta, ComponentStory } from '@storybook/react';
import PostContents from './index';

export default {
  title: 'Organisms/PostContents',
  component: PostContents,
} as ComponentMeta<typeof PostContents>;

const Template: ComponentStory<typeof PostContents> = () => <PostContents></PostContents>;

export const ContentItemTemplate = Template.bind({});
ContentItemTemplate.args = {};
