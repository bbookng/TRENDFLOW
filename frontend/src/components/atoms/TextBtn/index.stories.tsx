import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextBtn, { TextBtnProps } from '@/components/atoms/TextBtn';

export default {
  title: 'atoms/TextBtn',
  component: TextBtn,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    onClick: {
      action: 'clicked',
    },
  },
} as ComponentMeta<typeof TextBtn>;

const Template: ComponentStory<typeof TextBtn> = ({ children, onClick }: TextBtnProps) => {
  return <TextBtn onClick={onClick}>{children}</TextBtn>;
};

export const Primary = Template.bind({});
Primary.args = {
  children: '자세히 보기',
};
