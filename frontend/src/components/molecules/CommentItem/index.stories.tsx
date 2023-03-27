import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paper } from '@/components/atoms';
import CommentItem from '@/components/molecules/CommentItem';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: 'molecules/CommentItem',
  component: CommentItem,
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = () => (
  <ThemeComponent>
    <Paper>
      <CommentItem />
    </Paper>
  </ThemeComponent>
);

export const Primary = Template.bind({});
Primary.args = {};
