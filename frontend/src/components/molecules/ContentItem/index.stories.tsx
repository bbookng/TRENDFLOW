import { ComponentMeta, ComponentStory } from '@storybook/react';
import ContentItem, { ContentItemProps } from '@/components/molecules/ContentItem';
import { SocialContentInterface } from '@/types/social';
import { CONTENT_CODE } from '@/constants/code';
import { Paper } from '@/components/atoms';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: 'molecules/ContentItem',
  component: ContentItem,
} as ComponentMeta<typeof ContentItem>;

const Template: ComponentStory<typeof ContentItem> = ({
  content,
  nextPage,
  isLast,
}: ContentItemProps) => (
  <ThemeComponent>
    <Paper>
      <ContentItem content={content} nextPage={nextPage} isLast={isLast} />
    </Paper>
  </ThemeComponent>
);

export const EmptyTemplate = Template.bind({});
EmptyTemplate.args = {};
