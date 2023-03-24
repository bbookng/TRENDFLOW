import { ComponentMeta, ComponentStory } from '@storybook/react';
import Img from '@/components/atoms/Img';

export default {
  title: 'Atoms/Img',
  component: Img,
} as ComponentMeta<typeof Img>;

const Template: ComponentStory<typeof Img> = () => <Img width="120px" height="75px" />;

export const EmptyTemplate = Template.bind({});
EmptyTemplate.args = {};
