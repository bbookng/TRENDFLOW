import { ComponentMeta, ComponentStory } from '@storybook/react';
import ContentItem from '@/components/molecules/ContentItem';

export default {
  title: 'Molecules/ContentItem',
  component: ContentItem,
} as ComponentMeta<typeof ContentItem>;

const Template: ComponentStory<typeof ContentItem> = () => <ContentItem></ContentItem>;

export const ContentItemTemplate = Template.bind({});
ContentItemTemplate.args = {};
