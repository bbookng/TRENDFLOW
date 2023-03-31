import { ComponentMeta, ComponentStory } from '@storybook/react';
import YoutubeReaction, {
  YoutubeReactionProps,
} from '@/components/organisms/YoutubeResult/YoutubeReaction';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: 'organisms/YoutubeReaction',
  component: YoutubeReaction,
  argTypes: {
    viewCount: {
      type: 'number',
    },
    likeCount: {
      type: 'number',
    },
    commentCount: {
      type: 'number',
    },
  },
} as ComponentMeta<typeof YoutubeReaction>;

const Template: ComponentStory<typeof YoutubeReaction> = ({
  viewCount,
  likeCount,
  commentCount,
}: YoutubeReactionProps) => (
  <ThemeComponent>
    <YoutubeReaction viewCount={viewCount} likeCount={likeCount} commentCount={commentCount} />
  </ThemeComponent>
);

export const Primary = Template.bind({});
Primary.args = {
  viewCount: 250000,
  likeCount: 24000,
  commentCount: 3800,
};
