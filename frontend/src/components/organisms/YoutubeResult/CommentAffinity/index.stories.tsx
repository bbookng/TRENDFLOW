import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentAffinity, { AffinityProps } from '.';

export default {
  title: 'organisms/YoutubeResult/CommentAffinity',
  component: CommentAffinity,
  argTypes: {
    positive: {
      type: 'number',
    },
    negative: {
      type: 'number',
    },
    neutral: {
      type: 'number',
    },
  },
} as ComponentMeta<typeof CommentAffinity>;

const Template: ComponentStory<typeof CommentAffinity> = ({
  positive,
  negative,
  neutral,
}: AffinityProps) => <CommentAffinity positive={positive} negative={negative} neutral={neutral} />;

export const Primary = Template.bind({});
Primary.args = {
  positive: 47,
  negative: 32,
  neutral: 21,
};
