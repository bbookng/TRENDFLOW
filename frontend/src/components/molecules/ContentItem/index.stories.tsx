import { ComponentMeta, ComponentStory } from '@storybook/react';
import ContentItem from '@/components/molecules/ContentItem';
import Typography from '@/components/atoms/Typography';

export default {
  title: 'Molecules/ContentItem',
  component: ContentItem,
} as ComponentMeta<typeof ContentItem>;

const Template: ComponentStory<typeof ContentItem> = () => (
  <ContentItem>
    <Typography variant="H1">안녕하세요</Typography>
  </ContentItem>
);

export const ContentItemTemplate = Template.bind({});
ContentItemTemplate.args = {};
