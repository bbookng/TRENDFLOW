import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paper } from '@/components/atoms';
import CommentItem, { CommentItemProps } from '@/components/molecules/CommentItem';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: 'molecules/CommentItem',
  component: CommentItem,
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = ({
  comment,
  upCount,
  downCount,
  isLast,
  nextPage,
}: CommentItemProps) => (
  <ThemeComponent>
    <Paper>
      <CommentItem comment="하이요!" upCount={54} downCount={10} isLast nextPage={() => {}} />
    </Paper>
  </ThemeComponent>
);

export const Primary = Template.bind({});
Primary.args = {};
