import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from '@/components/@shared/Header';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: '@shared/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <ThemeComponent>
    <Header />
  </ThemeComponent>
);

export const HeaderTemplate = Template.bind({});
HeaderTemplate.args = {};
