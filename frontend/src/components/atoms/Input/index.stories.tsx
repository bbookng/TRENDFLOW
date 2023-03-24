import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '@/components/atoms/Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputTemplate = Template.bind({});
InputTemplate.args = {
  placeholder: '검색어를 입력하세요.',
};
