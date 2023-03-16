import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from '@/components/@shared/Header';

export default {
  title: '@shared',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const HeaderTemplate = Template.bind({});
HeaderTemplate.args = {};
