import { ComponentMeta, ComponentStory } from '@storybook/react';
import Paper from '@/components/atoms/Paper';

export default {
  title: 'Atoms/Paper',
  component: Paper,
} as ComponentMeta<typeof Paper>;

const Template: ComponentStory<typeof Paper> = () => <Paper></Paper>;

export const PaperTemplate = Template.bind({});
PaperTemplate.args = {};
