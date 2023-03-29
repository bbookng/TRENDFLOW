import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import SearchBar, { SearchBarProps } from '@/components/molecules/SearchBar';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'change',
    },
    onSubmit: {
      action: 'submit',
    },
  },
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = ({
  placeholder,
  value,
  onChange,
  onSubmit,
}: SearchBarProps) => {
  return (
    <SearchBar placeholder={placeholder} value={value} onChange={onChange} onSubmit={onSubmit} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  placeholder: '키워드를 입력하세요.',
};
