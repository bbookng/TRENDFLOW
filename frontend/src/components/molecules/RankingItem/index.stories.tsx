import { ComponentStory, ComponentMeta } from '@storybook/react';
import RankingItem from '@/components/molecules/RankingItem';

export default {
  title: 'Molecules/RankingItem',
  component: RankingItem,
  argTypes: {
    type: {
      options: ['up', 'down', 'new', 'same'],
      control: { type: 'radio' },
    },
    rank: {
      control: { type: 'text' },
    },
    keyword: {
      control: { type: 'text' },
    },
    step: {
      control: { type: 'text' },
    },
    width: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof RankingItem>;

const Template: ComponentStory<typeof RankingItem> = (args) => <RankingItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'up',
  rank: 1,
  keyword: '스타벅스',
  step: 2,
  width: '200px',
};
