import { ComponentMeta, ComponentStory } from '@storybook/react';
import DarkModeToggle from '@/components/@shared/Header/components/DarkModeToggle';

export default {
  title: '@shared/DarkModeToggle',
  component: DarkModeToggle,
} as ComponentMeta<typeof DarkModeToggle>;

const Template: ComponentStory<typeof DarkModeToggle> = () => <DarkModeToggle />;

export const DarkModeToggleTemplate = Template.bind({});
DarkModeToggleTemplate.args = {};
