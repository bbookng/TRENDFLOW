import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchBar, { SearchBarPropsInterface } from '@/components/molecules/SearchBar';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    searched: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = ({
  placeholder,
  searched,
}: SearchBarPropsInterface) => {
  return <SearchBar placeholder={placeholder} searched={searched} />;
};

export const Primary = Template.bind({});
Primary.args = {
  placeholder: '키워드를 입력하세요.',
  searched: '입력됨',
};
